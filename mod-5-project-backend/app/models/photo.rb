class Photo < ApplicationRecord
  belongs_to :user

  mount_uploader :attachment, ImageUploader
end
