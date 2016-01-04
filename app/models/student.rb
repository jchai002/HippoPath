class Student < ActiveRecord::Base
  has_many :addresses
  has_many :interviews
  belongs_to :school
end
