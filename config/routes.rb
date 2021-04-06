Rails.application.routes.draw do
  root controller: :chat_rooms, action: :index

  resources :chat_rooms
  resources :chat_messages
  resources :sessions, only: %w(new create destroy)
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
