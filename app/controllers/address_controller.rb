class AddressController < ApplicationController
  def assign_address_to_user
    @address = Address.find_or_create_by(address_params)
    if @address
      User.find(params[:user_id]).update_attributes({address_id: @address.id})
    end
    respond_to do |format|
      format.js { render layout: false, content_type: 'text/javascript' }
    end
  end

private
  def address_params
    params.require(:address).permit(:street, :apt, :city, :state, :zip, :on_campus, :full_address)
  end

end
