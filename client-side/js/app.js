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
  }).then(function(){
      miniQuery('p').hide();
      miniQuery('a').on('click', function() {
        var studentId = this.href.split("#")
       miniQuery("a").ajax({
        type: "GET",
        url: "http://localhost:3000/students/" + studentId[1]
      }).then(function(response){
        var a = JSON.parse(response)
        var b = a.id;
        var c = "#" + b.toString();
        console.log(c)
        console.log("HERHEHREHRHER")
        var x = document.getElementById(b.toString());
        if (x.style.display == "none"){
          x.style.display = "block"
        } else {
          x.style.display = "none"
        }
      })
     });
      // miniQuery('a').trigger('click');
  });
}






