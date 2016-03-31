Rails.application.routes.draw do

  resources :conversations, :only =>[:show, :index]
  resources :messages, :only =>[:create]
  resources :users,  :only =>[:edit, :update]
  put 'users/id/update_password' => 'users#update_password', :as => :update_password
  root 'home#index'
  get '/dash_board/interviews' => 'dash_board#interviews', :as => :interviews_dash_board
  get '/dash_board/search' => 'dash_board#search', :as => :search_dash_board


  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

  resources :interviews, only: [:new, :create, :update, :destroy]
  get '/interviews' => 'interviews#get_interviews'
  post '/interview_search' => 'interviews#search_interviews'
  post '/conversations' => 'conversations#create'
  match '/assign_address_to_user/:user_id' => 'address#assign_address_to_user', via: [:post, :put, :patch], :as => :assign_address
end
