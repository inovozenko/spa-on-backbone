yp.v.Counting = Backbone.View.extend({

    el: '.counter',

    initialize: function () {
        this.$el.counterUp({
            delay: 10,
            time: 1500
        });
    }
});