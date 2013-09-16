// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
  
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
      
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

(function() {
    String.prototype.toUrl = function() {
        return this.toLowerCase()
                   .replace(/^\s+|\s+$/g, "")
                   .replace(/[_|\s]+/g, "-")
                   .replace(/[^a-z0-9-]+/g, "")
                   .replace(/[-]+/g, "-")
                   .replace(/^-+|-+$/g, "");
    };

    String.prototype.toFloat = function() {
        return parseFloat(this);
    };

    if(!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g,'');
      };
    }

    if (!Array.prototype.filter)
    {
      Array.prototype.filter = function(fun /*, thisp */)
      {
        "use strict";
     
        if (this == null)
          throw new TypeError();
     
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun != "function")
          throw new TypeError();
     
        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
          if (i in t)
          {
            var val = t[i]; // in case fun mutates this
            if (fun.call(thisp, val, i, t))
              res.push(val);
          }
        }
     
        return res;
      };
    }
})();

function Lajota(container) {
    this.routes = {},
    this.container = container || "body";

    Lajota.prototype.router = function(routes) {
        $.extend(this.routes, routes);
        routes = this.routes;

        var hash;
        
        var splitParams = function() {
            for (route in routes) {
                var routeRegex = "^" + route.replace(/:([A-z0-9_-]*)/g, "([A-z0-9_-]*)") + "(/?)$";

                var callRoute = routes[route];
                var matches = new RegExp(routeRegex).exec(hash);

                if (matches) {
                    matches.shift();

                    routes.before();
                    callRoute.apply(this, matches);
                    routes.after();
                    
                    break;
                }
            }
        };

        var checkHash = function() {
            if (window.location.hash != hash) {
                hash = window.location.hash;
                splitParams();
            }
        };

        if ('onhashchange' in window) {
            $(window).bind('hashchange', checkHash);
        } else {
            window.setInterval(checkHash, 200);
        }

        if (!window.location.hash || window.location.hash == "#") {
            window.location.hash = "#/";
        }

        checkHash();
    };

    Lajota.prototype.render = function(templateName, data, callback) {
        var container = this.container;

        if ($("script#" + templateName).length) {
            var content = tmpl(templateName, data);

            if (callback) {
                return callback(content);
            }

            return $(container).html(content);
        }

        $.get("templates/" + templateName + ".html", function(resp) {
            var content = tmpl(resp, data);

            if (callback) {
                return callback(content);
            }

            return $(container).html(content);
        });
    };
}
