class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update, :destroy, :finish_signup]

  # GET /users/:id/edit
  def edit
    # authorize! :update, @user
    @address = @user.address || Address.new
  end

  def update

    if params[:user]
      @user.update(user_params)
      @user.school = School.find_or_create_by({name: params[:user][:school]}) unless params[:user][:school].blank?
      @user.save
    end

    respond_to do |format|
      if params[:image]
        @user.update_attributes(image: params[:image])
        @image = @user.image
        format.js
      else
        format.json { head :no_content }
      end
    end
  end

  # GET/PATCH /users/:id/finish_signup
  def finish_signup
    if request.patch? && params[:user]
      @user.update(user_params)
      @user.school = School.find_or_create_by({name: params[:user][:school]}) unless params[:user][:school].blank?
      if address_params_complete
        set_address(@user)
      end
      @user.save
      redirect_to interviews_dash_board_path
    end
  end

  def update_password
    @user = User.find(params[:user][:id])
    if user_params[:password] == user_params[:password_confirmation]
      @user.update_attributes(password: user_params[:password])
      sign_in(@user, :bypass => true)
      respond_to do |format|
        format.js
      end
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

  def set_address(user)
    street = params[:user][:address_street_and_house_number].titleize
    apt = params[:user][:address_apartment_number].gsub(/[^0-9A-Za-z]/, '')
    city = params[:user][:address_city].titleize
    state = params[:user][:address_state].upcase
    zip = params[:user][:address_zip]
    on_campus = params[:user][:address_on_campus] ? true : false
    address = user.address = Address.find_or_create_by({street: street, apt: apt, city: city, state: state, zip: zip, on_campus: on_campus, full_address: "#{street} #{city} #{state} #{zip}"})
  end

  def user_params
    accessible = [ :name, :email, :gender, :phone, :specialty]
    accessible << [ :password, :password_confirmation ] unless params[:user][:password].blank?
    params.require(:user).permit(accessible)
  end

  def address_params_complete
    params[:user][:address_street_and_house_number] && params[:user][:address_city] && params[:user][:address_state] && params[:user][:address_zip]
  end
end
