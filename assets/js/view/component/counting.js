yp.v.Counting = Backbone.View.extend({

    el: '.counter',

    initialize: function () {
        this.$el.counterUp({
            delay: 50,
            time: 1500
        });
    }
});