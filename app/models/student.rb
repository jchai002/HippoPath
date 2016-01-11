class Student < ActiveRecord::Base
  belongs_to :address
  has_many :interviews
  belongs_to :school

  validates_presence_of :email, :phone
  validates_presence_of :first_name, :last_name :on => :save
  validates_uniqueness_of :email, :message => "is taken."
  validates_uniqueness_of :phone, :message => "is taken."
  validates_length_of :username, :email, maximum: 50, :on => :save
  validates_length_of :phone, is: 10
  validates_email_format_of :email, message: "is not in the correct format"
  validates_format_of :phone, with: /\d{10}/, message: "is not in the correct format"
  validates :password, :presence => true, :length => {minimum: 6}, :on => :create, message: "must be at least 6 characters long"

end
