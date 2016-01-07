COPPERHEADS = [
  "Andrew Blum",
  "Armani Saldana",
  "Cecilia 'CJ' Joulain",
  "Danielle Cameron",
  "Daniel Woznicki",
  "Eric Dell'Aringa",
  "Gouron Paul",
  "Isaac Lee",
  "Jeremy Powell",
  "Joseph Marion",
  "Kai Huang",
  "Kim Allen",
  "Kyle Smith",
  "Mark Janzer",
  "Nicole Yee",
  "Peter Wiebe",
  "Steven Broderick"
]

COPPERHEADS.each {|student| Student.create(name: student)}

badges = [
  "DBC Guru",
  "Most likely to do a handstand",
  "Most likely not to show up",
  "CSS master",
  "Most likely to call you out on microaggressions"
]


Student.all.each do |student|
  3.times {student.badges.create(name: badges.sample)}
end
