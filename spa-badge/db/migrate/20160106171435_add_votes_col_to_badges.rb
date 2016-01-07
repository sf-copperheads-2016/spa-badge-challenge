class AddVotesColToBadges < ActiveRecord::Migration
  def change
    add_column :badges, :votes, :integer, default: 0
  end
end
