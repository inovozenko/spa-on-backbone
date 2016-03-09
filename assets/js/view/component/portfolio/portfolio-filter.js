yp.v.PortfolioFilter = Backbone.View.extend({

    el: '#filter',

    events: {
        'click a': 'clickFilterItem'
    },

    initialize: function () {
        yp.v.portfolioFilterItemActive = new yp.v.PortfolioFilterItemActive({
            el: this.$el.find(yp.v.PortfolioFilterItemActive.prototype.el)
        });
    },

    clickFilterItem: function (event) {
        event.preventDefault();
        yp.v.portfolioFilterItemActive.unrender();
        yp.v.portfolioFilterItemActive.setElement($(event.target)).render();
        yp.v.portfolioShuffleGrid.shuffle();
    }

});