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

(function() {
    var data = {
        products: [
            { id: 1, title: "Toalha de mesa em renda de bilro", description: "Linda toalha toda trabalhada no mais perfeito detalhe", price: "150,00" },
            { id: 2, title: "Saída de praia com detalhes bordados a ouro", description: "Linda toalha", price: "400,00" },
            { id: 3, title: "Centro de mesa simples", description: "Linda toalha", price: "30,00" },
            { id: 4, title: "Toalha de mesa em renda de bilro", description: "Linda toalha toda trabalhada no mais perfeito detalhe", price: "150,00" },
            { id: 5, title: "Saída de praia com detalhes bordados a ouro", description: "Linda toalha", price: "400,00" },
            { id: 6, title: "Centro de mesa simples", description: "Linda toalha", price: "30,00" },
            { id: 7, title: "Toalha de mesa em renda de bilro", description: "Linda toalha toda trabalhada no mais perfeito detalhe", price: "150,00" },
            { id: 8, title: "Saída de praia com detalhes bordados a ouro", description: "Linda toalha", price: "400,00" },
            { id: 9, title: "Centro de mesa simples", description: "Linda toalha", price: "30,00" },
            { id: 10, title: "Toalha de mesa em renda de bilro", description: "Linda toalha toda trabalhada no mais perfeito detalhe", price: "150,00" },
            { id: 11, title: "Saída de praia com detalhes bordados a ouro", description: "Linda toalha", price: "400,00" },
            { id: 12, title: "Centro de mesa simples", description: "Linda toalha", price: "30,00" }
        ]
    };

    var app = new Lajota("#content");
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
            app.render("template_grid", data);
        },

        "#/item/:id/:title": function(id) {
            var item = data.products.filter(function(i) { return i.id == id; })[0];

            var openDialog = function(content) {
                $(content).dialog({
                    modal: true,
                    width: 900,
                    close: function() { history.back() }
                });
            };

            var containerContent = $(app.container).html().trim();

            if (containerContent) {
                app.render("template_item", item, openDialog);
            
            } else {
                app.render("template_item", item);
            }

        }
    });
})();
