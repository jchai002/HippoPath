class CreateHospitals < ActiveRecord::Migration
  def change
    create_table :hospitals do |t|
      t.string :name, null: false, limit: 100
      t.references :address

      t.timestamps null: false
    end
  end
end
