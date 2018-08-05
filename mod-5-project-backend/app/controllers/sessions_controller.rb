class SessionsController < ApplicationController
  def create
    if (params["token"])
      user = User.find_by(username: params["username"])

      render json: {
        username: user.username,
        id: user.id,
        token: get_token(payload(user.username, user.id)),
        photos: user.photos
      }
    elsif (params["username"] && !params["token"])
      user = User.find_by(username: params["username"])
      if (user && user.authenticate(params["password"]))
        # payload = { name: params["username"], id: @user.id }
        render json: {
          username: user.username,
          id: user.id,
          token: get_token(payload(user.username, user.id)),
          photos: user.photos
        }
      else
        render json: {
          errors: "Those credentials don't match anything we have in our database"
        }, status: :unauthorized
      end
    end
  end

  private
  def sessions_params
    params.permit(:username, :password, :token)
  end
end
