class BadgesController < ApplicationController

  before_action :set_badge, only: [:show, :update, :destroy]

  def create
      @badge = Badge.new(badge_params)
      if @badge.save
        render json: @badge, status: :created, location: @badge
      else
        err
      end
    end

  private
  def set_badge
    @badge = Badge.find(params[:id])
  end

  def badge_params
    params.permit(:description, :student_id)
  end

  def err
    render json: @badge.errors, status: :unprocessable_entity
  end
end
