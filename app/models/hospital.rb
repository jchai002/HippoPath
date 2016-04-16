class Hospital < ActiveRecord::Base
  has_many :interviews
  validates_presence_of :name
end
