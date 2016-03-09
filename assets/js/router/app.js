yp.r.App = Backbone.Router.extend({

    routes: {
        '': 'index'
    },

    index: function () {
        new yp.v.IndexPage().render();
    }

});