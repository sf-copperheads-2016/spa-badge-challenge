class StudentsController < ApplicationController

  def index
    list_students
    render json: @students
  end

  def create
    @student = Student.new(student_params)
    if @student.save
      render json: @student
    else
      render json: @student.errors
    end
  end

  def show
    find_student
    render json: @student
  end

  def update
    find_student
    if @student.update(student_params)
      render json: @student
    else
      render json: @student.errors
    end
  end

  def destroy
    find_student
    @student.destroy
    render json: @students
  end

  private
  def find_student
    @student = Student.find(params[:id])
  end

  def student_params
    params.require(:student).permit(:name)
  end

  def list_students
    @students = Student.all
    @list_of_names = []
    @students.each do |name|
      @list_of_names << name.name
    end
  end
end
