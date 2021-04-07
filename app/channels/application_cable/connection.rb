module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :username
  end
end
