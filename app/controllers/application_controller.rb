class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery
  # before_action :get_unread_message_count

  # def get_unread_message_count
  #   @unread_message_count = Message.unread_by(current_user).count if current_user
  # end

  def after_sign_in_path_for(resource)
    if resource.sign_in_count == 1
      finish_signup_path(resource)
    else
      interviews_dash_board_path
    end
  end

end
