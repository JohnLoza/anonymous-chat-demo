class SessionsController < ApplicationController
  skip_before_action :require_username

  def new; end

  def create
    set_username(params[:username])
    redirect_to chat_rooms_path
  end

  def destroy
    forget_username
    redirect_to new_session_path
  end
end
