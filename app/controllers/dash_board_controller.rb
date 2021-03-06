class DashBoardController < ApplicationController
  before_action :authenticate_user!
  def interviews
    @hospital_names = []
    Hospital.all.each do |hospital|
      @hospital_names << hospital.attributes.slice('name')
    end
  end

  def search
    @saved_interview_ids = current_user.saved_interviews.collect(&:id)
    @hospital_names = []
    Hospital.all.each do |hospital|
      @hospital_names << hospital.attributes.slice('name')
    end
    @address = current_user.address
    @recent_interviews = Interview.build_search_result(Interview.enabled.limit(10))
  end

  def saved
    @interviews = Interview.build_saved_interviews(current_user.saved_interviews)
    @address = current_user.address
  end

end
