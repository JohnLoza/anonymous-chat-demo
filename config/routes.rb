Rails.application.routes.draw do
  root controller: :chat_rooms, action: :index
  resources :sessions, only: %i[ new create destroy ]

  resources :chat_rooms do
    resources :chat_messages
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
