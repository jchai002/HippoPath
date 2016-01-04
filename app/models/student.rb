class Student < ActiveRecord::Base
  belongs_to :address
  has_many :interviews
  belongs_to :school

end
