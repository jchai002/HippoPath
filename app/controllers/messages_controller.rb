class MessagesController < ApplicationController
  before_filter :authenticate_user!

  def create
    @conversation = Conversation.find(params[:conversation_id])
    @message = @conversation.messages.build(message_params)
    @message.sender_id = current_user.id
    @message.recipient_id = current_user == @conversation.sender ? @conversation.recipient_id : @conversation.sender_id
    @message.save!
    @path = conversation_path(@conversation)
  end

  def mark_message_read
    @message = Message.find(params[:id])
    @user = User.find(params[:user_id])
    @message.mark_as_read! :for => @user
    respond_to do |format|
      format.js
    end
  end

  def unread_message_count
    @unread_message_count = current_user.messages.unread_by(current_user).count if current_user
    respond_to do |format|
      format.js
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
