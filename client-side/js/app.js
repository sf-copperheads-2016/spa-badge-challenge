window.onload = function () {
  var source = document.getElementById("person-template").innerHTML;
  var template = Handlebars.compile(source);

  miniQuery("h1").ajax({
    type: "GET",
    url: "http://localhost:3000/students"
  }).then(function(data){
    var person = JSON.parse(data)
    var context = {person};
    var output = template(context);
    document.getElementById("nameoutput").innerHTML = output;
  }).catch(function(){
    console.log()
  });
  console.log("BEFORE AJAX");

  miniQuery("a").on('click', function(){
    console.log("IN AJAx")
    console.log(this)
      miniQuery("a").ajax({
        type: "GET",
        url: "http://localhost:3000/students/"+ href
      }).then(function(data){
      console.log(data)
    }).catch(function(){
      console.log("ERRROS")
    })
  });

  miniQuery("a").trigger("click");

}
