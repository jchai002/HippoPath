class Hospital < ActiveRecord::Base
  has_many :interviews
  has_one :address
  validates_presence_of :name
end
