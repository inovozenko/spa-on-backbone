(function($) {

    window.yp || (window.yp = {
        Model: {},
        Collection: {},
        v: {},
        r: {},
        Config: {}
    });

    yp.CONTEXT = '';

    yp.TEST_MODE = true;

    yp.Collection.createCollection = function (arrayMessage, Collection) {
        var i = 0,
            Model = Collection.prototype.model,
            model = new Model(),
            firstProp = Object.keys(model.attributes)[0],
            collection = new Collection();

        while ($.t(arrayMessage + '.' + i + '.' + firstProp, { defaultValue: 'undefined' }) !== 'undefined') {
            model = new Model();
            for (var prop in model.attributes) {
                model.set(prop, $.t(arrayMessage + '.' + i + '.' + prop));
            }
            model.set('index', i);
            collection.add(model);
            i++;
        }
        return collection;
    };

    yp.v.template = function (selector) {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
        return _.template($(selector).html());
    };

}(jQuery));

$(function() {

    yp.r.app = new yp.r.App();
    Backbone.history.start();

});
