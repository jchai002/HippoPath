class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :finish_signup]

  # GET /users/:id.:format
  def show
    # authorize! :read, @user
  end

  # GET /users/:id/edit
  def edit
    # authorize! :update, @user
  end

  def update
    binding.pry
    # authorize! :update, @user
    respond_to do |format|
      if @user.update(user_params)
        sign_in(@user == current_user ? @user : current_user, :bypass => true)
        format.html { redirect_to @user, notice: 'Your profile was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET/PATCH /users/:id/finish_signup
  def finish_signup
    if request.patch? && params[:user]
      school_name = params[:user][:school].titleize
      street = params[:user][:address_street_and_house_number].titleize
      apt = params[:user][:address_apartment_number].gsub(/[^0-9A-Za-z]/, '') unless params[:user][:address_apartment_number].blank?
      city = params[:user][:address_city].titleize
      state = params[:user][:address_state].upcase
      zip = params[:user][:address_zip]
      on_campus = params[:user][:address_on_campus] ? true : false
      @user.school = School.find_or_create_by({name: school_name})
      @user.address = Address.find_or_create_by({street: street, apt: apt, city: city, state: state, zip: zip, on_campus: on_campus})
      @user.update_attributes(user_params)
      redirect_to interviews_dash_board_path
    end
  end

  # DELETE /users/:id.:format
  def destroy
    # authorize! :delete, @user
    @user.destroy
    respond_to do |format|
      format.html { redirect_to root_url }
      format.json { head :no_content }
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      accessible = [ :name, :email, :gender, :phone, :specialty] # extend with your own params
      accessible << [ :password, :password_confirmation ] unless params[:user][:password].blank?
      params.require(:user).permit(accessible)
    end
end
