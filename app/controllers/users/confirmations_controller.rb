class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
  def new
    binding.pry
  end

  # The path used after resending confirmation instructions.
  def after_resending_confirmation_instructions_path_for(resource_name)
    flash[:notice] = "A confirmation email has been sent to #{resource.email}"
    return new_user_session_path
  end
end
