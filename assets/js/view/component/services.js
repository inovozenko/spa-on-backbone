yp.v.Services = Backbone.View.extend({

    el: '#services',

    template: yp.v.template('#service-template'),

    initialize: function () {
        this.collection = yp.Collection.createCollection('component.services.items', yp.Collection.ServiceCollection);
    },

    render: function () {
        this.$el.i18n();
        for (var i = 0; i <= 2; i++) {
            this.$el.find('.left-column').append(this.template(this.collection.at(i).toJSON()));
            this.$el.find('.right-column').append(this.template(this.collection.at(i + 3).toJSON()));
        }
        return this;
    }

});