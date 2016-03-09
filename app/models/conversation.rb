class Conversation < ActiveRecord::Base
  has_many :messages
  has_many :user_conversations, :class_name => 'UserConversation'
  has_many :users, :through => :user_conversations
end
