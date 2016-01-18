Rails.application.routes.draw do

root 'home#index'
  get '/dash_board' => 'dash_board#index', :as => :dash_board

  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

  resources :interviews, only: [:new, :create, :update, :destroy]
  get '/interviews' => 'interviews#get_interviews'
  post '/interview_search' => 'interviews#search_interviews'


end
