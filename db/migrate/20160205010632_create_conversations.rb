class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.timestamps null: false
      t.references :interview
      t.references :starter
      t.references :reciever
    end
  end
end
