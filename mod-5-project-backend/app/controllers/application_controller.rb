class ApplicationController < ActionController::Base
  def secret_key
    'secret key'
  end

  def authorization_token
    request.headers["Authorization"]
  end

  def authenticate(data)
    begin
      if (decoded_token())
        render json: data
      end
    rescue
      #JST:DecodeError
      render json: {
        message: 'Unauthorized'
      }, status: :unauthorized
    end
  end

  def decoded_token
    begin
      # byebug
      decoded = JWT.decode authorization_token(), secret_key(), true, { algorithm: 'HS256'}
    rescue JWT::VerificationError
      return nil
    end
  end

  def valid_token?
    !!decode_token
  end

  def requires_login
    if !valid_token?
      render json: {
        message: "You're wrong!"
      }, status: :unauthorized
    end
  end

  def payload(username, id)
    {username: username, id: id}
  end

  def get_token(payload)
    JWT.encode payload, secret_key(), 'HS256'
  end
end
