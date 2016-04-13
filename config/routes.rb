Rails.application.routes.draw do

  resources :users,  :only =>[:edit, :update]
  put 'users/id/update_password' => 'users#update_password', :as => :update_password
  get '/dash_board/interviews' => 'dash_board#interviews', :as => :interviews_dash_board
  get '/dash_board/search' => 'dash_board#search', :as => :search_dash_board
  get '/dash_board/saved' => 'dash_board#saved', :as => :saved_dash_board

  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

  authenticated :user do
   root 'dash_board#interviews'
  end

  unauthenticated :user do
    devise_scope :user do
      get "/" => 'home#index'
    end
  end

  resources :conversations, :only =>[:create, :show, :index] do
    resources :messages, :only =>[:create]
  end

  resources :interviews, only: [:new, :create, :update, :destroy]
  get '/interviews' => 'interviews#get_interviews'
  get '/interview_search' => 'interviews#search_interviews'
  post '/save_interview/:id' => 'interviews#save_interview'

  match '/assign_address_to_user/:user_id' => 'address#assign_address_to_user', via: [:post, :put, :patch], :as => :assign_address
  post '/mark_message_read/:id' => 'messages#mark_message_read'
  get '/unread_message_count' => 'messages#unread_message_count'
  get '/close_chat_box' => 'conversations#close_chat_box'
end
