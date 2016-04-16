class Interview < ActiveRecord::Base
  belongs_to :poster, :class_name => 'User'
  belongs_to :saver, :class_name => 'User'
  belongs_to :hospital
  validates_presence_of :poster, :hospital

  #takes a search object with properties
  def self.search(search_parameters)
    hospital_name = search_parameters[:hospital].downcase
    date = search_parameters[:date]
    ride_status = search_parameters[:ride_status].downcase
    if ride_status == 'either'
      result = joins(:hospital).where('lower(hospitals.name) = ? AND date LIKE ?', hospital_name , date)
    else
      result = joins(:hospital).where('lower(hospitals.name) = ? AND date LIKE ? AND lower(ride_status) LIKE ?', hospital_name , date, ride_status)
    end
  end

  def self.build_search_result(records)
    search_results = []
    records.each do |interview|
      search_result= {
        id: interview.id,
        date: interview.date,
        time: interview.time,
        created_at: interview.created_at,
        ride_status: interview.ride_status,
        poster_id: interview.poster.id,
        name:  interview.poster.name || interview.poster.email.split('@')[0],
        hospital: interview.hospital.name,
        specialty: interview.poster.specialty,
        gender: interview.poster.gender,
        avatar: interview.poster.image.url(:med),
        location: ([interview.poster.latitude, interview.poster.longitude] if interview.poster.address)
      }
      if interview.poster.school
        search_result[:school] = interview.poster.school.name
      else
        search_result[:school] = nil
      end
      search_results << search_result
    end
    search_results
  end

  def self.build_saved_interviews(records)
    saved_interviews = []
    records.each do |interview|
      interview_object= {
        id: interview.id,
        date: interview.date,
        time: interview.time,
        created_at: interview.created_at,
        ride_status: interview.ride_status,
        poster_id: interview.poster.id,
        hospital: interview.hospital.name,
        specialty: interview.poster.specialty,
        gender: interview.poster.gender,
        location: ([interview.poster.latitude, interview.poster.longitude] if interview.poster.address)
      }
      if interview.poster.school
        interview_object[:school] = interview.poster.school.name
      else
        interview_object[:school] = nil
      end
      saved_interviews << interview_object
    end
    saved_interviews
  end

end
