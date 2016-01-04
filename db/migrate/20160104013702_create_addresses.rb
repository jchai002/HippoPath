class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.boolean :on_campus
      t.string :street
      t.string :city
      t.string :state
      t.string :zip
      t.string :apt

      t.timestamps null: false
    end
  end
end
