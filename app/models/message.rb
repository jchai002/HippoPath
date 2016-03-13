class Message < ActiveRecord::Base
  belongs_to :conversation
  belongs_to :user
  acts_as_readable :on => :created_at
end
