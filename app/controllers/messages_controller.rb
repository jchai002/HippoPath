class MessagesController < ApplicationController

  def create
    @conversation=Conversation.find_by({id: message_params[:conversation_id]})
    if message_params[:body].empty?
      flash[:error]="message cannot be empty"
    else
    @message = @conversation.messages.build(body: message_params[:body])
    @message.user = current_user
    end

    @message.save!
    @conversation_path = conversation_path(@conversation)
  end

private
  def message_params
    params.require(:message).permit(:body, :conversation_id)
  end
end
