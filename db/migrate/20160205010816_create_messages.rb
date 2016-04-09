class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.references :conversation
      t.integer :sender_id
      t.integer :recipient_id
      t.string     :body

      t.timestamps null: false
    end
  end
end
