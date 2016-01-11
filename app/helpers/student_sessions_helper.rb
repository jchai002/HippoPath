module StudentSessionsHelper
  def log_in_student(student)
  session[:student_id] = student.id
  end

  def current_student
    @current_student ||= User.find_by(id: session[:student_id])
  end

  def student_logged_in?
    !current_student.nil?
  end

  def log_out_student
    session.delete(:student_id)
    @current_student = nil
  end
  
end
