class ApplicationController < ActionController::Base
  include ApplicationHelper
  include SessionsHelper
  before_action :require_username

  def require_username
    unless username.present?
      redirect_to new_session_path
    end
  end
end
