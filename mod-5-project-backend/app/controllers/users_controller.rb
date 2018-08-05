class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def show
    @user = User.find_by(id: params[:id])
    render json: {
      id: @user.id,
      username: @user.username,
      password_digest: @user.password_digest,
      token: @user.token,
      photos: @user.photos
    }
  end

  def edit
    user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    user.username = params["username"]
    user.password = params["password"]
    user.save
    # byebug
    render json: user
  end

  def create
    @user = User.new

    @user.username = params[:username]
    @user.password = params[:password]
    @user.token = get_token(payload(@user.username, @user.id))

    if (@user.save)
      render json: {
        username: @user.username,
        id: @user.id,
        token: @user.token
      }
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def users_photos
    @user = User.find_by(id: params[:user_id])

    authenticate(@user.photos)
  end
end
