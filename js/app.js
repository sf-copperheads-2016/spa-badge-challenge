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
        var student = JSON.parse(response)
        $().request({
          url: 'http://localhost:3000/get_badges/'+student.id,
          type: 'GET',
        }).then(function(response){
          var badges = JSON.parse(response)
          var context={
            "name": student.name,
            "badges": badges
          };
          var theCompiledHtml = theTemplate(context);
          $('.content-placeholder').sethtml(theCompiledHtml);
        })

      })
    }
    $('a').on("click", showTemplate)
  })

};



