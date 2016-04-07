class InterviewsController < ApplicationController
  require 'will_paginate/array'

  def get_interviews
    user=current_user
    @interviews=user.interviews.order(:created_at)
    respond_to do |format|
      format.html
      format.json
    end
  end

  #find the interviews by search parameters
  def search_interviews
    hospital = params[:interview_info][:hospital].titleize if params[:interview_info][:hospital]
    search_parameters = {
      hospital: hospital,
      date: params[:interview_info][:date],
      ride_status: params[:interview_info][:ride_status]
    }
    interview_records=Interview.search(search_parameters).all
    @results_count = interview_records.count
    @interviews = Interview.build_search_result(interview_records).paginate(:page => params[:page], :per_page => 6)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    user=current_user
    @interview = user.interviews.build(interview_params)
    hospital_name = params["interview_info"]["hospital"].titleize
    @interview.hospital = Hospital.find_or_create_by({name:hospital_name})
    if @interview.save
      render :json => {message:"interview successfully created"} # send back any data if necessary
    else
      render :json => { }, :status => 500
    end
  end

  def update
    user=current_user
    @interview = user.interviews.find_by({id: params[:id]})
    hospital_name = params["interview_info"]["hospital"].titleize
    @interview.hospital = Hospital.find_or_create_by({name:hospital_name})
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
