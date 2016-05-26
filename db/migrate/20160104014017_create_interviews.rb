class CreateInterviews < ActiveRecord::Migration
  def change
    create_table :interviews do |t|
      t.string :date, null: false, :limit => 20
      t.string :time, null: false, :limit => 20
      t.string :ride_status, null: false, :limit => 20
      t.references :poster
      t.references :saver
      t.references :hospital
      t.boolean :disabled, default: false

      t.timestamps null: false
    end
  end
end
