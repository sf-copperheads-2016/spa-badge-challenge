$.ready(function() {

  getTeachers();

  // set up handlebars helpers
  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  function getTeachers() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/teachers',
      success: function(response) {
        var teachers = JSON.parse(response);
        displayTeachers(teachers);
        setTeacherListeners();
      },
      fail: ajaxFailed
    });
  }

  function setVoteListeners(teacher_id) {
    $('.vote').on('submit', function(event) {
      event.preventDefault();
      var formData = serializeFormData(this);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/badges/vote',
        data: formData,
        success: function(response) {
          getTeacher(teacher_id);
        },
        fail: ajaxFailed
      });
    });
  }

  function serializeFormData(form) {
    var result = '';
    for (var i = 0; i < form.children.length; i++) {
      var element = form.children[i];
      if (element.localName == "input" && element.type != "image") {
        result += element.name;
        result += '=';
        result += element.value;
        result += '&';
      }
    }

    return result.substring(0, result.length - 1);
  }

  function setTeacherListeners() {
    $('.teacher').on('click', function(event) {
      event.preventDefault();
      getTeacher(this.getAttribute('teacher_id'));
    });
  }

  function displayTeachers(teachers) {
    $('#page-heading').innerText = 'SF Teachers and Mentors';
    $('#show-user').innerHTML = '';

    var teacherTmpl = $('#teachers-template').innerHTML;
    var template = Handlebars.compile(teacherTmpl);
    var context = { teacher: teachers };
    var compiledHTML = template(context);

    $('#teacher-list').innerHTML = compiledHTML;
  }

  function displayTeacherPage(teacher) {
    $('#page-heading').innerText = teacher.name + "'s Badges";
    $('#teacher-list').innerHTML = '';

    window.location = '#' + teacher.name.toLowerCase();

    var badgeTmpl = $('#badges-template').innerHTML;
    var template = Handlebars.compile(badgeTmpl);
    var context = { badge: teacher.badges };
    var compiledHTML = template(context);

    $('#show-user').innerHTML = compiledHTML;
  }

  function setHomeListener() {
    $('#home-button').on('click', function(event) {
      event.preventDefault();
      getTeachers();
    });
  }

  function getTeacher(teacher_id) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/teachers/' + teacher_id,
      success: function(response) {
        teacher = JSON.parse(response);
        displayTeacherPage(teacher);
        setHomeListener();
        setVoteListeners(teacher_id);
        setCreationListener(teacher_id);
      },
      fail: ajaxFailed
    })
  }

  function setCreationListener(teacher_id) {
    $('.add-badge').on('submit', function(event) {
      event.preventDefault();
      var formData = serializeFormData(this);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/teachers/' + teacher_id + '/badges',
        data: formData,
        success: function(response) {
          getTeacher(teacher_id);
        },
        fail: ajaxFailed
      });
    });
  }

  function ajaxFailed(response) {
    console.error(response);
  }
});
