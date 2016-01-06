# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

copperheads = [
"Andrew Blum",
"Armani Saldana",
"Cecilia 'CJ' Joulain",
"Danielle Cameron",
"Daniel Woznicki",
"Deanna Warren",
"Eric Dell'Aringa",
"Gouron Paul",
"Isaac Lee",
"Jeremy Powell",
"Joseph Marion",
"Joshua Kim",
"Kai Huang",
"Kim Allen",
"Kyle Smith",
"Mark Janzer",
"Nicole Yee",
"Peter Wiebe",
"Steven Broderick",
]
copperheads.each do |name|
  Student.create(name: name)
end
Badge.create(description: "You didn't die!!", student_id: 1)
