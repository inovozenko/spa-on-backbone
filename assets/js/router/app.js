yp.r.App = Backbone.Router.extend({

    routes: {
        '': 'index'
    },

    index: function () {
        $.i18n.init({
            resGetPath: yp.CONTEXT + '/locales/__lng__/__ns__.json',
            load: 'current',
            fallbackLng: 'ru',
            lng: 'ru'
        }, function () {
            new yp.v.IndexPage().render();
        });
    }

});