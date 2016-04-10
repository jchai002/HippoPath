class HomeController < ApplicationController

  def index
    @student_count=User.all.count
    @school_count= School.all.count
    @hospital_count= Hospital.all.count
  end

  def how_it_works
  end
  
end
