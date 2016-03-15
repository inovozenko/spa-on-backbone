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
        var href = $(event.currentTarget).attr('href');

        if (href.slice(0, 1) === '#') { //  if the clicked link is linked to an anchor, scroll the page to that anchor
            var mMenuAPI = this.$el.data('mmenu');
            mMenuAPI.bind('closed', function() {
                var mMenu = mMenuAPI.getInstance();
                delete mMenu.cbck.closed; // hard-code of unbind
                $('html, body').animate({
                    scrollTop: $(href).offset().top
                }, 1500, 'easeInOutExpo');
            });
        }
    }
});