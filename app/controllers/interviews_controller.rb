class InterviewsController < ApplicationController
  before_filter :authenticate_user!
  before_action :set_interview, only: [:destroy, :save_interview, :remove_from_saved]

  def get_interviews
    @interviews = current_user.posted_interviews.order(:created_at)
    respond_to do |format|
      format.html
      format.json
    end
  end

  #find the interviews by search parameters
  def search_interviews
    if params[:interview_info] #ajax request
      hospital = params[:interview_info][:hospital].downcase
      search_parameters = {
        hospital: hospital,
        date: params[:interview_info][:date],
        ride_status: params[:interview_info][:ride_status]
      }
    else #html request, auto change ride status
      hospital = params[:hospital].downcase
      search_parameters = {
        hospital: hospital,
        date: params[:date],
        ride_status: params[:ride_status]
      }
      search_parameters[:ride_status] = "Need Ride" if params[:ride_status] == "Offering Ride"
      search_parameters[:ride_status] = "Offering Ride" if params[:ride_status] == "Need Ride"
    end
    interview_records=Interview.search(search_parameters).all
    @interviews = Interview.build_search_result(interview_records)
    @address = current_user.address
    @searched = true
    respond_to do |format|
      format.html { render 'dash_board/search'}
      format.json
    end
  end

  def create
    @interview = current_user.posted_interviews.build(interview_params)
    hospital_name = params["interview_info"]["hospital"].downcase
    @interview.hospital = Hospital.find_or_create_by({name:hospital_name})
    if @interview.save
      render :json => {message:"interview created"}, :status => 200 # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  def update
    @interview = current_user.posted_interviews.find_by({id: params[:id]})
    if params["interview_info"]["hospital"]
    hospital_name = params["interview_info"]["hospital"].downcase
    @interview.hospital = Hospital.find_or_create_by({name:hospital_name})
    end
    @interview.assign_attributes(interview_params)
    if @interview.save
      render :json => {message:"Interview Updated"}, :status => 200 # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  def save_interview
    current_user.saved_interviews << @interview
    current_user.save!
    respond_to do |format|
      format.js
    end
  end

  def remove_from_saved
    current_user.saved_interviews.delete(@interview)
    respond_to do |format|
      format.js
    end
  end

  def destroy
    if @interview.destroy
      respond_to do |format|
        format.js
      end
    else
      render :json => { }, :status => 500
    end
  end

  private
    def set_interview
      @interview=Interview.find_by({id: params[:id]})
    end

    def interview_params
    params.require(:interview_info).permit(:id, :date, :time, :ride_status,:preinterview_dinner,:disabled)
    end
end
