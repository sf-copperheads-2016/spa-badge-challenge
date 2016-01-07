$.ready(function() {
  var nameIdMap = {};

  getTeachers();

  window.onhashchange = checkHash;

  // set up handlebars helpers
  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  function checkHash() {
    var teacherName = location.hash.substring(1, location.hash.length);
    if (nameIdMap.hasOwnProperty(teacherName)) {
      getTeacher(nameIdMap[teacherName])
    }
  }

  function getTeachers() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/teachers',
      success: function(response) {
        var teachers = JSON.parse(response);
        for (var i = 0; i < teachers.length; i++) {
          nameIdMap[teachers[i].name.toLowerCase()] = teachers[i].id;
        }
        if (location.hash.length === 0) {
          displayTeachers(teachers);
          setTeacherListeners();
        } else {
          checkHash();
        }
      },
      fail: ajaxFailed
    });
  }

  function setVoteListeners(teacher_id) {
    $('.vote').on('submit', function(event) {
      event.preventDefault();
      var formData = serializeFormData(this);
      var badgeId = formData.split('&')[0].split('=')[1];
      if (alreadyVoted(badgeId)) {
        alert('you already voted!!');
      } else {
        writeCookie(badgeId, "true");
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/badges/vote',
          data: formData,
          success: function(response) {
            getTeacher(teacher_id);
          },
          fail: ajaxFailed
        });
      }
    });
  }

  function alreadyVoted(badge_id) {
    if (getCookie(badge_id)) {
      return true;
    }
    return false;
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
      location.hash = '';
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

  // http://stackoverflow.com/questions/13154552/javascript-set-cookie-with-expire-time
  function writeCookie(key, value, days) {
    var date = new Date();

    // Default at 365 days.
    days = days || 365;

    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000

    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";

    return value;
  }

  // http://stackoverflow.com/questions/10730362/get-cookie-by-name
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
});
