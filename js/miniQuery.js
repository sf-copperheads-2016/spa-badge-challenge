/*!
 * minQuery
 */
var miniQuery = function(selector) {
  function isMulti(selector) {
    var type = selector.substring(0,1);
    return type != '#';
  }

  function deconstructSelector(selector) {
    var type = selector.substring(0,1);
    element = SweetSelector.select(selector);
    // addClass only applies to the first element
    if (isMulti(selector)) {
      element = element[0];
    }
    return element;
  };

  var SweetSelector = (function() {
    var exports = {};

    exports.select = function(selector) {
      var type = selector.substring(0, 1);
      var name = selector.substring(1);
      if (type == '#') { //  id selector
        return document.getElementById(name);
      } else if (type == '.') { // class selector
        return document.getElementsByClassName(name);
      } else { // better be a tag selector
        return document.getElementsByTagName(selector);
      }
    };

    return exports;
  })();

  var DOM = (function() {
    var exports = {};

    exports.hide = function(selector) {
      var element = deconstructSelector(selector);
      element.style.display = 'none';
    };

    exports.show = function(selector) {
      var element = deconstructSelector(selector);
      element.style.display = '';
    };

    exports.addClass = function(selector, klass) {
      var element = deconstructSelector(selector);
      var existingClasses = element.getAttribute('class') || '';
      if (existingClasses == '') {
        var resultClasses = klass;
      } else {
        var resultClasses = existingClasses + " " + klass;
      }
      element.setAttribute('class', resultClasses);
    };

    exports.removeClass = function(selector, klass) {
      var element = deconstructSelector(selector);
      var existingClasses = element.getAttribute('class') || '';
      re = new RegExp("\\s*" + klass + "\\s*", "g");
      var resultClasses = existingClasses.replace(re, '');
      if (resultClasses == '') {
        element.removeAttribute('class');
      } else {
        element.setAttribute('class', resultClasses);
      }
    };

    return exports;
  })();

  var EventDispatcher = (function() {
    var exports = {};

    exports.on = function(selector, eventName, callback) {
      var element = SweetSelector.select(selector);
      if (isMulti(selector)) {
        Array.prototype.map.call(element, function(el) {
          callback.bind(el);
          el.addEventListener(eventName, callback, false)
        });
      } else {
        callback.bind(el);
        element.addEventListener(eventName, callback, false);
      }
    };

    exports.trigger = function(selector, eventName) {
      var event = new Event(eventName);
      var element = SweetSelector.select(selector);
      if (isMulti(selector)) {
        Array.prototype.map.call(element, function(el) {
          el.dispatchEvent(event)
        });
      } else {
        element.dispatchEvent(event);
      }
    };

    return exports;
  })();

  var AjaxWrapper = (function() {
    var exports = {};

    exports.request = function(params) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(params.type, params.url);

        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          } else {
            reject(req.statusText);
          }
        }

        if (params.type == 'POST') {
          req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        if (params.data === undefined) {
          req.send();
        } else {
          req.send(params.data);
        }
      });
    };

    return exports;
  })();

  var exports = SweetSelector.select(selector);

  exports.hide = function() {
    DOM.hide(selector);
  };

  exports.show = function() {
    DOM.show(selector);
  };

  exports.addClass = function(klass) {
    DOM.addClass(selector, klass);
  };

  exports.removeClass = function(klass) {
    DOM.removeClass(selector, klass);
  };

  exports.on = function(eventName, callback) {
    EventDispatcher.on(selector, eventName, callback);
  };

  exports.trigger = function(eventName) {
    EventDispatcher.trigger(selector, eventName);
  };

  return exports;
}

miniQuery.ajax = function(params) {
    if (params.success === undefined || params.fail === undefined) {
      return Error('missing success or fail callback');
    }
    var success = params.success;
    var fail = params.fail;
    var ajaxProm = new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(params.type, params.url);

        req.onload = function() {
          if (Math.floor(req.status / 100) == 2) {
            resolve(req.response);
          } else {
            reject(req.statusText);
          }
        }

        if (params.type == 'POST') {
          req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        if (params.data === undefined) {
          req.send();
        } else {
          req.send(params.data);
        }
      });
    ajaxProm.then(success).catch(fail);
  }

var $ = miniQuery
