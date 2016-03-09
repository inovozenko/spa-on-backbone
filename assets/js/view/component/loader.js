yp.v.Loader = Backbone.View.extend({

    el: '#loader',

    unrender: function () {
        this.$el.fadeOut();
        return this;
    }

});