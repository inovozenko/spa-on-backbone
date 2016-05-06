yp.v.BackToTop = Backbone.View.extend({

    el: '#back-to-top',

    events: {
        'click': 'click'
    },

    click: function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    }

});