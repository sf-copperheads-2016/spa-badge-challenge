class BadgesController < ApplicationController

  def index
    @badges = Badge.all
    render json: @badges
  end

  def create
    @badge = Badge.new(badge_params)
    if @badge.save
      render json: @badge, status: :created, location: @badge
    else
      render json: @badge.errors, status: :unprocessable_entity
    end
  end

  private

    def badge_params
      params.require(:badge).permit(:phrase, :votes, :references)
    end
end
