class DashBoardController < ApplicationController
  before_action :authenticate_user!
  def interviews
    @hospital_names = []
    Hospital.all.each do |hospital|
      @hospital_names << hospital.attributes.slice('name')
    end
  end

  def search
    @hospital_names = []
    Hospital.all.each do |hospital|
      @hospital_names << hospital.attributes.slice('name')
    end
    @address = current_user.address
  end

end
