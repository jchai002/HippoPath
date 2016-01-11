class StudentsController < ApplicationController

  before_action :authorize_student, only: [:show]

  def new
    @student = Student.new
  end

  def create
    student = Student.new(student_params)
    if student.save
      log_in_student(student)
      redirect_to root_path
    else
      flash[:error]= student.errors.full_messages.join(" ")
      render new_student_path
    end
  end

  def show
    @student = current_student
  end

  def edit
    @student = current_student
  end

  def update
    @student = current_student
    @student.assign_attributes(student_params)
    if @student.save
      flash[:notice]="Information Saved"
      redirect_to student_path
    else
      flash[:error]="Ops, Something Went Wrong, Information Cannot Be Saved."
    end
  end

  def change_password
    @student = current_student
  end

  def update_password
    @student= current_student

    if @student.authenticate(student_params[:password])
      @student.assign_attributes(password: student_params[:new_password])
      if @student.save
        flash[:notice]="Password Changed Successfully."
        redirect_to student_path
      else
        flash[:error]="Your New Password Is Invalid."
        redirect_to :back
      end
    else
      flash[:error]="You Didn't enter Your Old Password Correctly."
      redirect_to :back
    end
  end

  private

  def authorize_student
    redirect_to root_url unless current_student
  end

  def student_params
    params.require(:student).permit(:first_name, :last_name, :email, :password, :new_password, :phone, :address)
  end
end
