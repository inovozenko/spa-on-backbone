yp.v.WhoWeAre = Backbone.View.extend({

    el: '#about .row',

    template: yp.v.template('#who-we-are-template'),

    initialize: function () {
        this.collection = yp.Collection.createCollection('component.whoWeAre.items', yp.Collection.WhoWeAreCollection);
    },

    render: function () {
        this.$el.i18n();
        this.collection.each(function (model) {
            this.$el.append(this.template(model.toJSON()));
        }, this);

        return this;
    }

});