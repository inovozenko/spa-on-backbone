yp.v.PortfolioShuffleGrid = Backbone.View.extend({

    el: '#grid',

    template: yp.v.template('#portfolio-item-template'),

    events: {
        'click .full-screen': 'openModal'
    },

    initialize: function () {
        this.collection = yp.Collection.createCollection('component.portfolio.items', yp.Collection.PortfolioCollection);
        new yp.v.PortfolioFilter();
    },

    render: function () {
        this.collection.each(function (model) {
            this.$el.append(this.template(model.toJSON()));
        }, this);

        var _this = this;
        setTimeout(function () {
            _this.$el.shuffle({
                itemSelector: '.portfolio-item'
            });
        }, 500);
        return this;
    },

    openModal: function (event) {
        event.preventDefault();
        var index = $(event.currentTarget).data('index');

        new yp.v.PortfolioModal({ model: this.collection.at(index) }).render();
    },

    shuffle: function () {
        this.$el.shuffle('shuffle', yp.v.portfolioFilterItemActive.$el.attr('data-group'));
    }

});