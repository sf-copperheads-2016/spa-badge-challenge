Rails.application.routes.draw do

  resources :students, except: [:new, :edit]
  resources :badges, except: [:new, :edit, :update, :destroy]
  get '/get_badges/:id', to: 'students#get_badges'

end
