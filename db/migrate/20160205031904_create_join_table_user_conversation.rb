class CreateJoinTableUserConversation < ActiveRecord::Migration
  def change
    create_join_table :users, :conversations do |t|
      # t.index [:user_id, :conversation_id]
      # t.index [:conversation_id, :user_id]
    end
  end
end
