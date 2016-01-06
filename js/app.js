$.ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/teachers',
    success: function(response) {
      console.log(response);
    },
    fail: function(response) {
      console.log(response);
    }
  })
});
