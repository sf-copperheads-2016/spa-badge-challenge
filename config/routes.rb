Rails.application.routes.draw do

  resources :students, except: [:new, :edit]
  resources :badges, except: [:new, :edit, :update, :destroy]
  resources :votes, only: [:create]
end
