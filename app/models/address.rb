class Address < ActiveRecord::Base
  has_many :users
  before_save :prepare_address

  def prepare_address
      street.downcase! unless street.blank?
      city.downcase! unless city.blank?
      state.upcase! unless state.blank?
      apt.downcase! unless apt.blank?
      self.full_address = "#{self.street} #{self.city} #{self.state} #{self.zip}"
    unless self.full_address.blank?
      coords = Geocoder.coordinates(self.full_address)
      if coords
        self.latitude = coords[0]
        self.longitude = coords[1]
        self.valid_address = true
      end
    end
  end

end
