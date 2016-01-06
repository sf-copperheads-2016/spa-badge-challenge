$().ready(function(){
  $('body').on("loadIndex", indexTemplate)
  $('body').trigger("loadIndex")
})

var indexTemplate = function() {
  // Grab the template script
  var theTemplateScript = $("#index").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);
  $().request({
    url: 'http://localhost:3000/students/',
    type: 'GET',

  }).then(function(response){
    var parsed = JSON.parse(response)
    var context={
      "students": parsed,
    };
    var theCompiledHtml = theTemplate(context);
    $('.content-placeholder').sethtml(theCompiledHtml);
  }).then(function(){
    var showTemplate = function(event){
      event.preventDefault();
      var id = this.getAttribute("href")
      var theTemplateScript = $("#show").html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      $().request({
        url: 'http://localhost:3000/students/'+id,
        type: 'GET',
      }).then(function(response){
        var parsed = JSON.parse(response)
        var student = parsed.student
        var badges = parsed.badges
        context={
          "name": student.name,
          "badges": badges
        }
        var theCompiledHtml = theTemplate(context);
        $('.content-placeholder').sethtml(theCompiledHtml);
      }).then(function(){
        var createVote = function(event){
          event.preventDefault();
          var id = this.getAttribute("href")
          var value=this.className == "upvote" ? 1 : -1

          $().request({
            type: 'POST',
            url: 'http://localhost:3000/votes?value='+value+'&badge_id='+id
          })
        }
        $('.upvote').on('click', createVote)
        $('.downvote').on('click', createVote)


      })
    }
    $('a').on("click", showTemplate)
  })

};



