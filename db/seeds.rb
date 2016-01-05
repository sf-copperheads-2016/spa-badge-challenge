# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
dan = Student.create(name: "Dan")
badge = Badge.create(description: "NEATO")
vote = Vote.create(value: 1)
badge.votes << vote
dan.badges << badge

