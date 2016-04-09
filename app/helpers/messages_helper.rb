module MessagesHelper
  def self_or_other(message)
    message.sender == current_user ? "self" : "other"
  end

  def message_interlocutor(message)
    message.sender == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
  end

  def conversation_recipient_id(conversation)
    conversation.sender == current_user ? conversation.recipient.id : conversation.sender.id
  end
end
