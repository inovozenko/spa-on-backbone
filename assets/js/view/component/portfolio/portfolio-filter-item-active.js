yp.v.PortfolioFilterItemActive = Backbone.View.extend({

    el: '.active',

    render: function () {
        this.$el.addClass('active');
    },

    unrender: function () {
        this.$el.removeClass('active');
    }

});