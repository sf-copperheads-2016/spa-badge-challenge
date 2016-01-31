class BadgesController < ApplicationController

  def create
    @badge = Badge.new(params[:title])
    render json: @badge
  end

  def update
  end

  private

end
