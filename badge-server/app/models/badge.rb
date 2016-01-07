class Badge < ActiveRecord::Base
  belongs_to :teacher
  default_scope { order('votes DESC') }

  validates :phrase, presence: true
end
