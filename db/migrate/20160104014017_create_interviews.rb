class CreateInterviews < ActiveRecord::Migration
  def change
    create_table :interviews do |t|
      t.string :date
      t.string :time
      t.boolean :preinterview_dinner
      t.string :ride_status
      t.references :student
      t.references :hospital
      
      t.timestamps null: false
    end
  end
end
