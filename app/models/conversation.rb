class Conversation < ActiveRecord::Base
  has_many   :messages
  belongs_to :starter, :class_name => "User", :foreign_key => "starter_id"
  belongs_to :reciever, :class_name => "User", :foreign_key => "reciever_id"

end
