class User < ApplicationRecord
  has_many :photos
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true

  serialize :attachment, JSON
end
