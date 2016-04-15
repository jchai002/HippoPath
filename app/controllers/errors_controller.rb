class ErrorsController < ApplicationController

  def internal_server_error
  	render(:status => 404)
  end

  def page_not_found
    render(:status => 500)
  end
end
