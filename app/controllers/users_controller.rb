class UsersController < ApplicationController
  before_filter :authenticate_user!, only: [:update, :finish_signup, :account_overview, :set_address_with_geolocation]

  def account_overview
    @address = current_user.address || Address.new
  end

  def update
    if params[:user]
      current_user.update(user_params)
      current_user.school = School.find_or_create_by({name: params[:user][:school]}) unless params[:user][:school].blank?
      current_user.save
    end
    respond_to do |format|
      if params[:image]
        current_user.update_attributes(image: params[:image])
        @image = current_user.image
        format.js
      else
        format.json { head :no_content }
      end
    end
  end

  def finish_signup
    if request.patch? && params[:user]
      current_user.update(user_params)
      current_user.school = School.find_or_create_by({name: params[:user][:school]}) unless params[:user][:school].blank?
      if address_params_complete
        set_address(current_user)
      end
      current_user.save
      redirect_to dash_board_interviews_path
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

  def set_address_with_geolocation
    @address= Address.find_or_create_by({street: params[:street], city: params[:city], state: params[:state], zip: params[:zip], full_address: params[:full_address], browser_generated: true, valid_address: true})
    @address.update_attributes({latitude: params[:latitude], longitude: params[:longitude]}) if @address.browser_generated?
    @user = current_user
    @user.update_attributes({address:@address}) if @address
    respond_to do |format|
      format.js
    end
  end

  def toggle_mute
    if params[:toggle_state] == 'mute'
      current_user.update_attributes({chat_muted:true})
    end
    if params[:toggle_state] == 'unmute'
      current_user.update_attributes({chat_muted:false})
    end
    respond_to do |format|
      format.js
    end
  end
  private

  def set_address(user)
    street = params[:user][:address_street_and_house_number].downcase
    apt = params[:user][:address_apartment_number].gsub(/[^0-9A-Za-z]/, '')
    city = params[:user][:address_city].downcase
    state = params[:user][:address_state].upcase
    zip = params[:user][:address_zip]
    on_campus = params[:user][:address_on_campus] ? true : false
    address = user.address = Address.find_or_create_by({street: street, apt: apt, city: city, state: state, zip: zip, on_campus: on_campus, full_address: "#{street} #{city} #{state} #{zip}"})
  end

  def user_params
    accessible = [ :name, :email, :gender, :phone, :specialty, :no_warning]
    accessible << [ :password, :password_confirmation ] unless params[:user][:password].blank?
    params.require(:user).permit(accessible)
  end

  def address_params_complete
    params[:user][:address_street_and_house_number] && params[:user][:address_city] && params[:user][:address_state] && params[:user][:address_zip]
  end
end
