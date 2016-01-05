class StudentsController < ApplicationController

  def index
    @students = Student.all
    render json: @students
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

end
