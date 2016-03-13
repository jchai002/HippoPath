class Conversation < ActiveRecord::Base
  has_many   :messages
  belongs_to :starter, :class_name => "User", :foreign_key => "starter_id"
  belongs_to :reciever, :class_name => "User", :foreign_key => "reciever_id"

  def conversation_target(current_user)
    target_user = self.starter if self.reciever == current_user
    target_user = self.reciever if self.starter == current_user
    return target_user
  end
end
