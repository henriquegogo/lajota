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
    var router = function(routes) {
        $.extend(app.routes, routes);
        routes = app.routes;
 
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

    var render = function(templateName, data, callback) {
        var container = app.container;

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

    var app = {
        router: router,
        routes: {},
        render: render,
        container: "body"
    };

    window.app = app;
})();

(function() {
    app.container = "#content";

    app.router({
        before: function() {
            $(document).ajaxStart(function(){
                var loadingElement = $("<div id='loading' style='background: yellow'>Loading...</div>");
                $("body").prepend(loadingElement);

            }).ajaxStop(function(){
                $("#loading").remove();
            });
        },

        after: function() {
        },
        
        "#/": function() {
            var data = { products: ["Rechilieu", "Bilro", "Croché"] };

            app.render("internal", data);
        },

        "#/user/:id": function(id) {
            console.log("Opening", id);
        },

        "#/user/:id/edit": function(id) {
            console.log("Editing", id);
        },

        "#/user/:id/:curriculum": function(id, cv) {
            console.log("Editing " + id + " with cv " + cv);
        },

        "#/help": function() {
            console.log('help');
        }
    });
})();
