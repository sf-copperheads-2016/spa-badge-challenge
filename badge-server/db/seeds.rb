Teacher.create(name: 'Julian')
Teacher.create(name: 'Walker')

walker = Teacher.find_by(name: 'Walker')
walker.badges.create(phrase: 'The coolest', votes: 0)
walker.badges.create(phrase: 'Most likely to eat pizza', votes: 0)
