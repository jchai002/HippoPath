Rails.application.routes.draw do

  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup
  match '/assign_address_to_user/:user_id' => 'address#assign_address_to_user', via: [:post, :put, :patch], :as => :assign_address
  post '/set_address_with_geolocation' => 'users#set_address_with_geolocation'
  get '/users/:id/account_overview' => 'users#account_overview', :as => :account_overview
  put '/user/update_password' => 'users#update_password', :as => :update_password
  put '/update_user/:id' => 'users#update', :as => :update_user

  authenticated :user do
    root 'dash_board#interviews'
  end

  unauthenticated :user do
    devise_scope :user do
      get "/" => 'home#index'
    end
  end

  namespace :dash_board do
    get '/interviews' => :interviews
    get '/search' => :search
    get '/saved' => :saved
  end

  resources :interviews, only: [:new, :create, :update, :destroy]
  namespace :interviews do
    get '/' => :get_interviews
    get '/search' => :search_interviews
    post '/save/:id' => :save_interview
    delete '/remove_from_saved/:id' => :remove_from_saved
  end

  resources :conversations, :only =>[:create, :show, :index] do
    resources :messages, :only =>[:create]
  end

  post '/mark_message_read/:id' => 'messages#mark_message_read'
  get '/unread_message_count' => 'messages#unread_message_count'
  get '/close_chat_box' => 'conversations#close_chat_box'
  put '/toggle_mute' => 'users#toggle_mute'
end
