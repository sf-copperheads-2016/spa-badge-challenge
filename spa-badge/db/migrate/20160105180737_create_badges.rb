class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :title
      t.integer :vote_count, default: 0
      t.timestamps null: false
    end
  end
end
