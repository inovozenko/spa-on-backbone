yp.v.Menu = Backbone.View.extend({

    el: '.navbar-default',

    events: {
        'click a.page-scroll': 'pageScroll'
    },

    pageScroll: function (event) {
        event.preventDefault();
        var href = $(event.target).attr('href');

        $('html, body').stop().animate({
            scrollTop: $(href).offset().top
        }, 1500, 'easeInOutExpo');
    }

});