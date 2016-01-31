/*!
 * minQuery
 */
var miniQuery = (function(tag){
  var SweetSelector = function(){
    if (tag.substring(0,1) === "#"){
      var domElement = document.getElementById(tag.substring(1));
      return domElement;
    } else if (tag.substring(0,1) === ".") {
      tagArray = tag.split(" ")
      var domElement = document.getElementsByClassName(tag.substring(1));
      console.log(domElement)
      return domElement;
    } else {
      var domElement = document.getElementsByTagName(tag);
      return domElement;
    }
    }
  var element = SweetSelector(tag);

 return {
  hide: function(){
    for(var i = 0; i < element.length; i++){
      element[i].style.display = "none";
    }
  },
  show: function(){
     for(var i = 0; i < element.length; i++){
      element[i].style.display = "block";
    }
  },
  addClass: function(newTag){
    for(var i = 0; i <element.length; i++){
      element[i].classList.add(newTag)
    }
  },
  removeClass: function(newTag){
    for(var i = 0; i <element.length; i++){
      element[i].classList.remove(newTag)
    }
  },
  on: function(event, eventFunc) {
     for(var i = 0; i < element.length; i++) {
      element[i].addEventListener(event, eventFunc);
      console.log("I GOT TO THE METHOD")
    }
  },
  trigger: function(event) {
    var e = new Event(event)
    for(var i = 0; i < element.length; i++) {
      element[i].dispatchEvent(e);
    }
  },
    ajax: function(options){
          var xhr = new XMLHttpRequest();
          var p1= new Promise(function(resolve,reject){
            xhr.onreadystatechange = function(){
              if (xhr.readyState !== 4){
                return;
              }
              if (xhr.status !== 200){
                console.log("HERE 200")
                console.log(xhr.response)
                console.log(xhr)
                return reject(xhr.response);
              }
            resolve(xhr.response);
            }
            xhr.open(options['type'], options['url'], true)
            xhr.send();
          })
           return p1
        }
}
});


var $ = function(tag){
  return miniQuery(tag);
}

