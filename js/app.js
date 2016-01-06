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
    var showTemplate = function(event, id){
      event.preventDefault();
      var id = id || this.getAttribute("href")
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
          "badges": badges,
          "id": student.id
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
          }).then(function(){
            showTemplate(event, id)
          })
        }
        var createBadge = function(event){
           event.preventDefault();
           var id = this.elements["student_id"].value
           var description = this.elements["description"].value
           $().request({
            type: "POST",
            url: 'http://localhost:3000/badges?description='+description+'&student_id='+id
           }).then(function(){
            showTemplate(event, id)
          })
        }
        $('.upvote').on('click', createVote)
        $('.downvote').on('click', createVote)
        $('form').on('submit', createBadge)
      })
    }
    $('a').on("click", showTemplate)
  })
};



