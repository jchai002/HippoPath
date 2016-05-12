class Address < ActiveRecord::Base
  has_many :users
  belongs_to :hospital
  belongs_to :school
  before_save :prepare_address
  after_create :set_coords

  def prepare_address
    street.downcase! unless street.blank?
    city.downcase! unless city.blank?
    state.upcase! unless state.blank?
    apt.downcase! unless apt.blank?
    self.full_address = "#{self.street} #{self.city} #{self.state} #{self.zip}"
  end

  def set_coords
    unless self.full_address.blank? || self.browser_generated
      coords = Geocoder.coordinates(self.full_address)
      if coords
        self.latitude = coords[0]
        self.longitude = coords[1]
        self.valid_address = true
        self.save
      end
    end
  end

end
