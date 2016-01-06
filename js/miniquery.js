var miniQuery = function(selector){
  selector = selector || "string"

  var SweetSelector = function(){
    var firstChar = selector.slice(0,1)
    var substring = selector.substring(1,selector.length)
    if(firstChar==='#'){
      return document.getElementById(substring)
    } else if(firstChar==='.'){
      return document.getElementsByClassName(substring)
    } else {
      return document.getElementsByTagName(selector)
    }
  };

  var selected = SweetSelector(selector);
  return {
    ready: function(callBack){
      window.addEventListener("load", function(event) {
        callBack();
      });
    },

    html: function(){
      if(selected instanceof HTMLCollection){
        for(var i=0; i<selected.length; i++){
          return selected[i].innerHTML;
        }
      } else {
        return selected.innerHTML;
      }
    },

    sethtml: function(object){
      selected[0].innerHTML = object;
    },

    hide: function(){
      if(selected instanceof HTMLCollection) {
        for(var i=0; i<selected.length; i++){
          selected[i].style.display = "none"
        }
      } else {
        selected.style.display="none"
      }
    },

    show: function(){
      if(selected instanceof HTMLCollection) {
        for(var i=0; i<selected.length; i++){
          selected[i].style.removeProperty("display")
        }
      } else {
        selected.style.removeProperty("display")
      }
    },

    addClass: function(className){
      if(selected instanceof HTMLCollection) {
        for(var i=0; i<selected.length; i++){
          selected[i].classList.add(className)
        }
      } else {
        selected.classList.add(className)
      }
    },

    removeClass: function(className){
      var length = selected.length
      if(selected instanceof HTMLCollection) {
         for(var i=length-1; i>=0; i--){
         selected[i].classList.remove(className)
        }
      } else {
        selected.classList.remove(className)
      }
    },
// Event Dispatching
    on: function(eventName, callBack){
      if(selected instanceof HTMLCollection){
         for(var i=0; i<selected.length; i++){
            selected[i].addEventListener(eventName, callBack, false);
          }
      } else {
        selected.addEventListener(eventName, callBack, false);
      }
    },
    trigger: function(eventName){
      var event = new Event(eventName);
      selected[0].dispatchEvent(event);
    },

//Ajax request
    request: function(options) {
      var newPromise = new Promise(function(resolve, reject){
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open(options.type, options.url, options.dataType, options.data, true)
        ajaxRequest.onload = function(){
          if(ajaxRequest.status >= 200 && ajaxRequest.status < 400) {
            resolve(ajaxRequest.response);
          } else {
          reject(ajaxRequest.response);
          }
        }
        ajaxRequest.send()
        })
      return newPromise
    }
  }
}

var $ = function(selector) {
  return miniQuery(selector)
}



