class MessagesController < ApplicationController

def create
  @conversation=Conversation.find_by({id: params[:message]["data-cid"]})
  @message = @conversation.build(message_params)

  if @message.save
    render :json => {message:"message successfully created"} # send back any data if necessary
  else
    render :json => { }, :status => 500
  end

end

private
  def message_params
    params.require(:message).permit(:body)
  end
end
