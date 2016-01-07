class BadgesController < ApplicationController
  def create
    badge = Badge.new(badges_params)

    if badge.save
      render json: badge, status: :created
    else
      render json: badge, status: :unprocessable_entity
    end
  end

  def update
    badge = Badge.find_by(id: badges_params[:id])
    badge.votes += badges_params[:value]

    if badge.save
      render json: badge, status: :no_content
    else
      render json: badge, status: :unprocessable_entity
    end
  end

  private

  def badges_params
    params.permit(:id, :student_id, :name, :value)
  end
end
