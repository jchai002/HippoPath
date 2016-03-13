class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :get_unread_message_count

  def get_unread_message_count
    @unread_message_count = Message.unread_by(current_user).count if current_user
  end

  def after_sign_in_path_for(resource)
    interviews_dash_board_path
  end
end
