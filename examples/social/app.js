(function() {
    var app = new Lajota("#content");
    app.router({
        before: function() {},

        after: function() {},

        "#/": function() {
            app.render("template_index");
        },
    });
})();