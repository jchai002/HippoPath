class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.boolean :on_campus, default: false
      t.string :street, default: '', :limit => 1000
      t.string :city, default: '', :limit => 100
      t.string :state, default: '', :limit => 20
      t.string :zip, default: '', :limit => 20
      t.string :apt, default: '', :limit => 20
      t.string :full_address, default: '', :limit => 1000
      t.float :longitude
      t.float :latitude
      t.boolean :valid_address, default: false
      t.boolean :browser_generated,  default: false

      t.timestamps null: false
    end
  end
end
