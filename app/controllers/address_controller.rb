class AddressController < ApplicationController

  def assign_address_to_user
    @address = Address.find_or_create_by(address_params)
    if @address
      current_user.update_attributes({address_id: @address.id})
    end
    respond_to do |format|
      format.js
    end
  end

private
  def address_params
    params.require(:address).permit(:street, :apt, :city, :state, :zip, :on_campus)
  end
end
