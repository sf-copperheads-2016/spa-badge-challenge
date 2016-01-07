class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :name, null: false
      t.belongs_to :student

      t.timestamps null: false
    end
  end
end
