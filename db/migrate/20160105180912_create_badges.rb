class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.text :description
      t.references :student
      t.integer :score, default: 0
      t.timestamps null: false
    end
  end
end
