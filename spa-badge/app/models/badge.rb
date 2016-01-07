class Badge < ActiveRecord::Base
  belongs_to :student
  validates :name, presence: true
end
