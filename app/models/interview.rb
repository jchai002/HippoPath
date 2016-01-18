class Interview < ActiveRecord::Base
  belongs_to :user
  belongs_to :hospital

  #takes a search object with properties
  def self.search(search_parameters)
    if search_parameters
      where('hospital LIKE ? AND date LIKE ? AND ride_status LIKE ?', "%#{search.hosptial.upcase}%","%#{search.date.upcase}%","%#{search.ride_status.upcase}%")
    else
      all
    end
  end

end
