class Badge < ActiveRecord::Base
  belongs_to :student
  has_many :votes

  def points
     votes.sum(:value)
  end
end
