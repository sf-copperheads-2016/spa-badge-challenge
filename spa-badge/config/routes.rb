Rails.application.routes.draw do

  root 'students#index'
  get 'students/index'
  resources :students do
    resources :badges
  end
end
