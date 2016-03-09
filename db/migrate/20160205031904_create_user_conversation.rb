class CreateUserConversation < ActiveRecord::Migration
  def change
    create_table :user_conversations, :id => false do |t|
      t.column :user_id, :integer
      t.column :conversation_id, :integer
    end
  end
end
