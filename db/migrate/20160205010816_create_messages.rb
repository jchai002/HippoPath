class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.references :conversation
      t.integer :sender_id, null: false
      t.integer :recipient_id,  null: false
      t.string  :body, null: false, limit: 10000

      t.timestamps null: false
    end
  end
end
