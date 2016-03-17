yp.v.MobileLeftMenu = Backbone.View.extend({

    el: '#mmenu',

    events: {
        'click li > a': 'clickItem'
    },

    initialize: function () {
        this.$el.mmenu({
            navbar: {
                title: 'Твой проект'
            }
        });
        yp.mmenuAPI = this.$el.data('mmenu');
    },

    clickItem: function (event) {
        var href = $(event.currentTarget).attr('href');

        if (href.slice(0, 1) === '#') { //  if the clicked link is linked to an anchor, scroll the page to that anchor
            yp.mmenuAPI.bind('closed', function() {
                delete yp.mmenuAPI.getInstance().cbck.closed; // hard-code of unbind
                $('html, body').animate({
                    scrollTop: $(href).offset().top
                }, 1500, 'easeInOutExpo');
            });
        }
    }
});