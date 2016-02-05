Rails.application.routes.draw do

  resources :conversations
  resources :messages, :only =>[:create]

  root 'home#index'
  get '/dash_board/interviews' => 'dash_board#interviews', :as => :interviews_dash_board
  get '/dash_board/search' => 'dash_board#search', :as => :search_dash_board


  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

  resources :interviews, only: [:new, :create, :update, :destroy]
  get '/interviews' => 'interviews#get_interviews'
  post '/interview_search' => 'interviews#search_interviews'


end
