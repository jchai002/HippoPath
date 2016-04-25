class Address < ActiveRecord::Base
  has_many :users
  belongs_to :hospital
  belongs_to :school
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

  def self.create_address_by_coords(latitude,longitude)
    query = "#{latitude},#{longitude}"
    begin
      address = Geocoder.search(query).first.data["address_components"]
      street = address[0]['long_name'].downcase + ' ' + address[1]['long_name'].downcase
      city = address[2]['long_name'].downcase
      state = address[4]['short_name'].upcase
      zip = address[6]['long_name'].downcase
      return find_or_create_by({street:street,city:city,state:state,zip:zip})
    rescue
      return false
    end
  end
end
