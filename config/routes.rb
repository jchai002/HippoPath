Rails.application.routes.draw do

root 'dash_board#index'

  get '/interviews' => 'interviews#get_interviews'
  post '/interviews' => 'interviews#create'
end
