yp.v.FooterMenu = Backbone.View.extend({

    el: 'footer .footermenu',

    events: {
        'click a.page-scroll': 'pageScroll'
    },

    pageScroll: function (event) {
        event.preventDefault();
        var href = $(event.target).attr('href');

        $('html, body').stop().animate({
            scrollTop: $(href).offset().top
        }, 2500, 'easeInOutExpo');
    }

});