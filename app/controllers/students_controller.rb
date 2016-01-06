class StudentsController < ApplicationController

  before_action :set_student, only: [:show, :update, :destroy]

  def index
    @students = Student.all
    render json: @students
  end

  def show
    render json:{
      student: @student, badges: @student.badges
    }

  end

  def create
    @student = Student.new(post_params)
    if @student.save
      render json: @student, status: :created, location: @student
    else
      err
    end
  end

  def update
    if @student.update(post_params)
      head :no_content
    else
      err
    end
  end

  def destroy
    @student.destroy
    head :no_content
  end

  private
  def set_student
    @student = Student.find(params[:id])
  end

  def post_params
    params.permit(:title, :author, :date, :body)
  end

  def err
    render json: @post.errors, status: :unprocessable_entity
  end
end
