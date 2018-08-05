class SharedController < ApplicationController
  def index
    allShared = []
    Shared.all.each do |index|
      userObj = User.find_by(id: index.user_id)
      photoObj = Photo.find_by(id: index.photo_id)
      # byebug

      if photoObj != nil
        allShared << {
          id: index.id,
          photo_id: photoObj.id,
          user: userObj,
          photo: photoObj,
          likes: index.likes
        }
      end
    end
    render json: allShared
  end

  def show
    shared = Shared.find_by(id: params[:id])
    user = User.find_by(id: shared.user_id)
    photo = Photo.find_by(id: shared.photo_id)

    render json: {
      id: shared.id,
      user: user,
      photo: photo
    }
  end

  def create
    shared_photo = Shared.find_by(photo_id: params["photo"])

    if shared_photo != nil
      userObj = User.find_by(id: shared_photo.user_id)
      photoObj = Photo.find_by(id: shared_photo.photo_id)

      render json:{
        id: shared_photo.id,
        user: userObj,
        photo: photoObj,
        likes: shared_photo.likes
      }
    else
      shared = Shared.new

      user = User.find_by(id: params["user"])
      photo = Photo.find_by(id: params["photo"])
      shared.url = photo.attachment.url
      shared.user = user
      shared.photo = photo
      shared.likes = 0
      # byebug
      shared.save

      render json:{
        id: shared.id,
        user: user,
        photo: photo
      }
    end
  end

  def update
    photo = Shared.all.find_by(photo_id: params[:id])
    photo.likes += 1
    # debugger
    photo.save
    render json: photo
  end

  def destroy
    shared = Shared.find_by(photo_id: params[:id])
    # byebug
    shared.destroy

    render json: {message: "Photo deleted"}
  end

end
