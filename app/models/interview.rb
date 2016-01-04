class Interview < ActiveRecord::Base
  belongs_to :student
  belongs_to :hospital
end
