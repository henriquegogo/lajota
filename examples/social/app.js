(function() {
    var app = new Lajota("#content");
    app.router({
        before: function() {},

        after: function() {},

        "#/": function() {
            app.render("template_index");
        },

        "#/help": function() {
            app.render("template_help");
        },
        
        "#/bikes": function() {
            var data = {
                bikes: [
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 12, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Princesa' - Monark City" },
                    { id: 13, thumbPath: "images/bike-list-item-thumb.jpg", info: "'Azulzinha' - Houston Enterprise" }
                ]
            };
            
            app.render("template_bikes", data);
        },

        "#/bikes/:id": function() {
            var data = { id: 12, imagePath: "images/bike-list-item.jpg", info: "'Princesa' - Monark City" };

            app.render("template_bike", data);
        },
        
        "#/users": function() {
            app.render("template_users");
        },
    });
})();
