class BadgesController < ApplicationController

  def create
    @badge = Badge.new(badge_params)
    @badge.votes = 0
    if @badge.save
      render json: @badge, status: :created
    else
      render json: @badge.errors, status: :unprocessable_entity
    end
  end

  def vote
    @badge = Badge.find(params[:slogan_id])
    if params[:vote_type] == "up"
      @badge.update(votes: @badge.votes + 1)
      head :no_content
    elsif params[:vote_type] == "down"
      @badge.update(votes: @badge.votes - 1) unless @badge.votes == 0
      head :no_content
    else
      head :unprocessable_entity
    end
  end

  private

    def badge_params
      params.permit(:phrase, :votes, :teacher_id)
    end
end
