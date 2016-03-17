yp.v.TopMenu = Backbone.View.extend({

    el: '.navbar-nav',

    events: {
        'click a.page-scroll': 'pageScroll',
        'mouseenter .dropdown': 'blogHovered',
        'mouseleave .dropdown': 'blogHovered'
    },

    render: function () {
        this.$el.i18n();
        return this;
    },

    pageScroll: function (event) {
        event.preventDefault();
        var href = $(event.target).attr('href');

        $('html, body').stop().animate({
            scrollTop: $(href).offset().top
        }, 1500, 'easeInOutExpo');
    },

    blogHovered: function () {
        var $dropDownMenu = this.$el.find('.dropdown-menu');

        this.$el.find('.dropdown').toggleClass('open');
        $dropDownMenu.animate({ top: '47px' }, function () {
            $dropDownMenu.animate({ top: '40px' });
        });
    }

});