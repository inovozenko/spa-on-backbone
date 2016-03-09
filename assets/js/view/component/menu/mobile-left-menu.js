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
    },

    clickItem: function (event) {
        var href = $(event.target).attr('href');

        if (href.slice(0, 1) === '#') { //  if the clicked link is linked to an anchor, scroll the page to that anchor
            this.$el.one('closed.mm', function() {
                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: $(href).offset().top
                    });
                }, 10);
            });
        }
    }
});