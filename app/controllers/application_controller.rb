class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery
  before_action :ensure_open_conversation_storage
  unless ActionController::Base.consider_all_requests_local
    rescue_from Exception, :with => :render_error
    rescue_from ActiveRecord::RecordNotFound, :with => :render_not_found
    rescue_from ActionController::RoutingError, :with => :render_not_found
    rescue_from ActionController::UnknownController, :with => :render_not_found
    rescue_from ActionController::UnknownAction, :with => :render_not_found
  end

  def after_sign_in_path_for(resource)
    if resource.sign_in_count == 1
      finish_signup_path(resource)
    else
      interviews_dash_board_path
    end
  end

  private
  def ensure_open_conversation_storage
    session[:open_conversations] ||= []
    @open_conversations = session[:open_conversations]
  end

  def render_not_found
    render :template => "/error/404.html.erb", :status => 404
  end

  def render_error
    render :template => "/error/500.html.erb", :status => 500
  end
end
