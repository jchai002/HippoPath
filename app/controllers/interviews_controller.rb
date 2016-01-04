class InterviewsController < ApplicationController
  def get_interviews
    @interviews=Interview.all
    respond_to do |format|
      format.html 
      format.json
    end
  end
end
