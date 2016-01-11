Rails.application.routes.draw do

root 'dash_board#index'

  resources :interviews, only: [:new, :create, :update, :destroy]
  get '/interviews' => 'interviews#get_interviews'
  
end
