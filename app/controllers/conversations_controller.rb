class ConversationsController < ApplicationController
  before_filter :authenticate_user!
  layout false

  def index
    @conversations = current_user.involved_conversations
    @no_message = true if current_user.involved_conversations.length == 0
  end

  def create
    if Conversation.between(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.between(params[:sender_id],params[:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end
    render json: { conversation_id: @conversation.id }
  end

  def show
    @conversation = Conversation.find(params[:id])
    @reciever = interlocutor(@conversation)
    @messages = @conversation.messages
    @message = Message.new
    @path = conversation_path(@conversation)
    session[:open_conversations] << @conversation.id unless session[:open_conversations].include?(@conversation.id)
  end

  def close_chat_box
    session[:open_conversations].delete(params[:conversation_id].to_i)
    respond_to do |format|
      format.js
    end
  end

  private
  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end

end
