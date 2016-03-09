yp.v.Portfolio = Backbone.View.extend({

    el: '#product',

    initialize: function () {
        this.collection = yp.Collection.createCollection('component.services.items', yp.Collection.ServiceCollection);
    },

    render: function () {
        this.$el.i18n();
        yp.v.portfolioShuffleGrid = new yp.v.PortfolioShuffleGrid().render();
        return this;
    }

});