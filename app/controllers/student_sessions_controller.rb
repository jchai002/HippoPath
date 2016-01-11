class StudentSessionsController < ApplicationController

  def new
    @student = Student.new
  end

  def create
    @student = Student.find_by(email: student_session_params[:email])
    if @student && @student.authenticate(student_session_params[:password])
      log_in_student(@student)
      redirect_to root_url
    else
      flash[:error] = "Incorrect email or password."
      redirect_to login_path
    end
  end

  def destroy
    log_out_student
    redirect_to root_path
  end

  private

  def student_session_params
    params.require(:student_session).permit(:email, :password)
  end
end
