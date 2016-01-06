$.ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/teachers',
    success: function(response) {
      var teachers = JSON.parse(response);
      displayTeachers(teachers);
    },
    fail: function(response) {
      console.log(response);
    }
  })

  function displayTeachers(teachers) {
    var teacherTmpl = $('#teachers-template').innerHTML;
    var template = Handlebars.compile(teacherTmpl);
    var context = { teacher: teachers };
    var compiledHTML = template(context);

    $('#teacher-list').innerHTML = compiledHTML;
  }
});
