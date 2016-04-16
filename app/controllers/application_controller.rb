class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery

  def after_sign_in_path_for(resource)
    if resource.sign_in_count == 1
      finish_signup_path(resource)
    else
      dash_board_interviews_path
    end
  end

  private
  def ensure_open_conversation_storage
    session[:open_conversations] ||= []
    @open_conversations = session[:open_conversations]
  end
end
