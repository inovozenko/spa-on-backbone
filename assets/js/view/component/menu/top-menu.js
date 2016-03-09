yp.v.TopMenu = Backbone.View.extend({

    el: '.navbar-nav',

    events: {
        'mouseenter .dropdown': 'blogHovered',
        'mouseleave .dropdown': 'blogHovered'
    },

    render: function () {
        this.$el.i18n();
        return this;
    },

    blogHovered: function () {
        var $dropDownMenu = this.$el.find('.dropdown-menu');

        this.$el.find('.dropdown').toggleClass('open');
        $dropDownMenu.animate({ top: '47px' }, function () {
            $dropDownMenu.animate({ top: '40px' });
        });
    }

});