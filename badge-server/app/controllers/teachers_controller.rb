class TeachersController < ApplicationController
  before_action :set_teacher, only: [:show, :update, :destroy]

  def index
    @teachers = Teacher.all
    render json: @teachers
  end

  def show
    @teacher = Teacher.find(params[:id])
    render json: @teacher
  end
end
