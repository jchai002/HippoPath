class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.boolean :on_campus, default: false
      t.string :street, default: ''
      t.string :city, default: ''
      t.string :state, default: ''
      t.string :zip, default: ''
      t.string :apt, default: ''
      t.string :full_address, default: ''
      t.float :longitude
      t.float :latitude

      t.timestamps null: false
    end
  end
end
