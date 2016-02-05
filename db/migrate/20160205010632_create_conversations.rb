class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.string :sender
      t.string :receiver 
      t.timestamps null: false
    end
  end
end
