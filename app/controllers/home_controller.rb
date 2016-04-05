class HomeController < ApplicationController

  def index
    @student_count=User.all.count
    @school_count= School.all.count
    @hospital_count= Hospital.all.count
    @landing_page = true
  end
end
