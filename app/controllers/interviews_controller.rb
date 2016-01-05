class InterviewsController < ApplicationController

  def get_interviews
    @interviews=Interview.order(:created_at)
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
      render :json => {message:"interview successfully created"} # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  def update
    @interview = Interview.find_by({id: params[:id]})
    hospital_name = params["interview_info"]["hospital"]
    @interview.hospital=Hospital.find_by({name:hospital_name})
    @interview.assign_attributes(interview_params)
    if @interview.save
      render :json => {message:"Interview Successfully Updated."} # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  def destroy
    @interview=Interview.find_by({id: params[:id]})
    if @interview.destroy
      render :json => {message:"Interview Successfully Deleted."} # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  private
    def interview_params
    params.require(:interview_info).permit(:id, :date, :time, :ride_status,:preinterview_dinner)
    end
end
