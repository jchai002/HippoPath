class Interview < ActiveRecord::Base
  belongs_to :user
  belongs_to :hospital

  #takes a search object with properties
  def self.search(search_parameters)
    if search_parameters
      #need to use hosptial id here because sql tables expect hosptial_id instead of hospital
      hospital=search_parameters[:hosptial]
      date=search_parameters[:date]
      ride_status = search_parameters[:ride_status]
      binding.pry
      find_by_sql ["SELECT * FROM interviews WHERE hospital LIKE ? AND date LIKE ? AND ride_status LIKE ?", hospital , date, ride_status]


    else
      all
    end
  end

end
