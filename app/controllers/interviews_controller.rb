class InterviewsController < ApplicationController

  def get_interviews
    @interviews=Interview.all
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @interview = Interview.new(interview_params)
    hospital_name = params["interview_info"]["hospital"]
    @interview.hospital=Hospital.find_by({name:hospital_name})

    if @interview.save
      render :json => {success:"save success"} # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  private
    def interview_params
    params.require(:interview_info).permit(:date, :time, :ride_status,:preinterview_dinner)
    end
end
