class Address < ActiveRecord::Base
  has_many :users
  before_save :prepare_address

  def prepare_address
    self.attributes.each do |name, value|
      value.downcase! if value && name!='on_campus'
    end
    self.full_address = "#{self.street} #{self.city} #{self.state} #{self.zip}"
    unless self.full_address.blank?
      coords = Geocoder.coordinates(self.full_address)
      self.latitude = coords[0]
      self.longitude = coords[1]
    end
  end

end
