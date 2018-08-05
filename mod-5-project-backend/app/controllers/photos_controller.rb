class PhotosController < ApplicationController

  def create
    photo = Photo.new
    user = User.find_by(id: params["user"])

    photo.user = user
    photo.attachment = params["attachment"]
    photo.tags = params["tags"]
    photo.name = params["name"]
    photo.colors = params["colors"]
    photo.expressions = params["expressions"]
    photo.favorite = false
    photo.shared = false

    photo.save

    render json: {
      id: photo.id,
      attachment: photo.attachment,
      name: photo.name,
      tags: photo.tags,
      user: user
    }

  end


  def index
    photos = Photo.all
    render json: photos
  end

  def new
    photo = Photo.new
  end

  def destroy
    photo = Photo.find(params[:id])
    photo.destroy

    render json: {message: "Photo deleted"}
  end

  def show
    photo = Photo.find(params[:id])
    render json: photo
  end

  def edit
    photo = Photo.find(params[:id])
  end

  def update
    photo = Photo.find(params[:id])
    photo.favorite = params["favorite"]
    photo.shared = params["shared"]
    photo.name = params["name"]

    photo.save
    render json: photo
  end

  private
  def photo_params
    params.require(:photo).permit(:name, :attachment, :formData)
  end
end
