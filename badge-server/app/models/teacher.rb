class Teacher < ActiveRecord::Base
  has_many :badges, dependent: :destroy
end
