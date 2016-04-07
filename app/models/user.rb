class User < ActiveRecord::Base
  belongs_to :school
  belongs_to :address
  has_many   :messages
  has_many   :interviews, foreign_key: 'poster_id'
  has_many :conversations, :foreign_key => :sender_id
  has_attached_file :image, styles: { small: "50x50", med: "100x100", large: "200x200" }, default_url:'/images/portraitplaceholder.png'
  validates_attachment :image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }
  # acts_as_reader

  delegate :street, :to => :address
  delegate :apt, :to => :address
  delegate :city, :to => :address
  delegate :state, :to => :address
  delegate :zip, :to => :address
  delegate :on_campus, :to => :address
  delegate :latitude, :to => :address
  delegate :longitude, :to => :address

  def involved_conversations
    Conversation.where("sender_id = ? OR recipient_id = ?", self.id, self.id)
  end

  def self.find_conversation(user_1, user_2)
    Conversation.where("(starter_id = ? AND reciever_id = ?) OR (reciever_id = ? AND starter_id = ?)", user_1.id, user_2.id,  user_1.id,user_2.id).first
  end

  TEMP_EMAIL_PREFIX = 'change@me'
  TEMP_EMAIL_REGEX = /\Achange@me/

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :confirmable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  validates_format_of :email, :without => TEMP_EMAIL_REGEX, on: :update

  def self.find_for_oauth(auth, signed_in_resource = nil)

    # Get the identity and user if they exist
    identity = Identity.find_for_oauth(auth)

    # If a signed_in_resource is provided it always overrides the existing user
    # to prevent the identity being locked with accidentally created accounts.
    # Note that this may leave zombie accounts (with no associated identity) which
    # can be cleaned up at a later date.
    user = signed_in_resource ? signed_in_resource : identity.user

    # Create the user if needed
    if user.nil?

      # Get the existing user by email if the provider gives us a verified email.
      # If no verified email was provided we assign a temporary email and ask the
      # user to verify it on the next step via UsersController.finish_signup
      #email_is_verified = auth.info.email && (auth.info.verified || auth.info.verified_email)
      email = auth.info.email #if email_is_verified
      user = User.where(:email => email).first if email

      # Create the user if it's a new registration
      if user.nil?
        user = User.new(
          name: auth.extra.raw_info.name,
          #username: auth.info.nickname || auth.uid,
          email: email ? email : "#{TEMP_EMAIL_PREFIX}-#{auth.uid}-#{auth.provider}.com",
          password: Devise.friendly_token[0,20]
        )
        user.save!
      end
    end

    # Associate the identity with the user if needed
    if identity.user != user
      identity.user = user
      identity.save!
    end
    user
  end

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end
end
