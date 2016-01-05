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
      render :json => {success:"interview successfully created"} # send back any data if necessary
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
      render :json => {success:"interview successfully updated"} # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  def destroy
    @interview=Interview.find_by({id: params[:id]})
    if @interview.destroy
      render :json => {success:"interview successfully deleted"} # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  private
    def interview_params
    params.require(:interview_info).permit(:id, :date, :time, :ride_status,:preinterview_dinner)
    end
end
