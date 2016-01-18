class Interview < ActiveRecord::Base
  belongs_to :user
  belongs_to :hospital

  #takes a search object with properties
  def self.search(search_parameters)
    if search_parameters
      #need to use hosptial id here because sql tables expect hosptial_id instead of hospital
      hospital_id=search_parameters[:hospital_id]
      date=search_parameters[:date]
      ride_status = search_parameters[:ride_status]

      result = where('hospital_id = ? AND date LIKE ? AND (ride_status LIKE ? OR ride_status = ?)', hospital_id , date, ride_status, 'Either')
      return result

    else
      all
    end
  end

  def self.build_search_result(records)
    search_results=[]
    records.each do |interview|
      search_result= {
        id: interview.id,
        date: interview.date,
        time: interview.time,
        ride_status: interview.ride_status,
        school: interview.user.school,
        hospital: interview.hospital.name,
        specialty: interview.user.specialty,
        gender: interview.user.gender
      }

      search_results << search_result
    end

    return search_results
  end

end
