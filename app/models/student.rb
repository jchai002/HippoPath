class Student < ActiveRecord::Base
  belongs_to :address
  has_many :interviews
end
