class VotesController < ApplicationController
  def create
    vote = Vote.create(value: params[:value], badge_id: params[:badge_id])
    badge = Badge.find(params[:badge_id])
    badge.update(score: badge.points)

  end
end
