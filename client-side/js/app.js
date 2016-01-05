// miniQuery("h2").show();

miniQuery("h1").ajax({
  type: "GET",
  url: "http://localhost:3000/students"
}).then(function(data){
  console.log(data)
  var person = JSON.parse(data)
  for(i=0;i<person.length;i++){
    var ul = document.getElementsByTagName('ul')[0]
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(person[i].name));
    ul.appendChild(li);
  }
    // document.getElementsByTagName('ul')[0].innerHTML = person[i].name

  // document.ul.appendChild(document.createElement("<li>" + person[0].name + "</li>"));
  console.log(data)
}).catch(function(){
  console.log()
})
