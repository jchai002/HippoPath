class ConversationsController < ApplicationController
  before_action :set_conversation, only: [:show, :destroy, :authorize_user]
  before_action :authorize_user, only: [:show, :destroy]

  # GET /conversations/1
  # GET /conversations/1.json
  def show
    @messages = @conversation.messages
    @message = Message.new
  end

  # POST /conversations
  # POST /conversations.json
  def find_or_create
    interivew_poster_id = conversation_params[:interview_poster_id]
    conversation_target_user = User.find_by({id: interivew_poster_id})
    @conversation = User.find_conversation(current_user,conversation_target_user)
    if @conversation
      redirect_to conversation_path(@conversation)
    else
      @conversation = Conversation.create({starter: current_user, reciever: conversation_target_user})
      respond_to do |format|
        if @conversation.save
          format.html { redirect_to @conversation, notice: 'Conversation was successfully created.' }
          format.json { render :show, status: :created, location: @conversation }
        else
          format.html { render :new }
          format.json { render json: @conversation.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /conversations/1
  # DELETE /conversations/1.json
  def destroy
    @conversation.destroy
    respond_to do |format|
      format.html { redirect_to conversations_url, notice: 'Conversation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_conversation
    @conversation = Conversation.find(params[:id])
  end

  def authorize_user
    #todo fix this broken method
    redirect_to root_url unless @conversation.starter == current_user || @conversation.reciever == current_user
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def conversation_params
    params.permit(:interview_poster_id)
  end
end
