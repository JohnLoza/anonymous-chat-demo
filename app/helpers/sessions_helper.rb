module SessionsHelper
  def username
    session[:username]
  end

  def set_username(username)
    session[:username] = username
  end

  def forget_username
    session.delete(:username)
  end
end
