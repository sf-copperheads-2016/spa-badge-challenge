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
  // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
  // Add the compiled html to the page
    $('.content-placeholder').sethtml(theCompiledHtml);
  }).then(function(){
    var showTemplate = function(event){
      event.preventDefault();
      console.log("Show Template Test")
    }
    $('a').on("click", showTemplate)

  })

};



