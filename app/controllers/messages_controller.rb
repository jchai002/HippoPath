class MessagesController < ApplicationController

def create
  @conversation=Conversation.find_by({id: params[:conversation_id]})
  @message = @conversation.messages.build(body: message_params[:body])
  if @message.save
    render :json => {message:"message successfully created"} # send back any data if necessary
  else
    render :json => { }, :status => 500
  end

end

private
  def message_params
    params.require(:message).permit(:body, :conversation_id)
  end
end
