class CreateRides < ActiveRecord::Migration
  def change
    create_table :rides do |t|
      t.string :type
      t.string :starting_location
      t.string :destination

      t.timestamps null: false
    end
  end
end
