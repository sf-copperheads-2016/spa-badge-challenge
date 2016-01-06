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
  })

};

$('div').on("loadIndex", indexTemplate)
$('div').trigger("loadIndex")

