class Badge < ActiveRecord::Base
  belongs_to :student
  has_many :votes
end
