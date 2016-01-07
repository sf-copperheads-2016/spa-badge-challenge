class StudentsController < ApplicationController
  def index
    @students = Student.all
    render json: {students: @students}
  end

  def show
    @student = Student.find_by(student_params)
    @badges = @student.badges.order(:created_at)
    render json: {student: @student, badges: @badges}
  end

  private

  def student_params
    params.permit(:id)
  end
end
