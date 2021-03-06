yp.v.IndexPage = Backbone.View.extend({

    initialize: function () {
    },

    render: function () {
        new WOW().init();

        new yp.v.MobileLeftMenu();
        new yp.v.TopMenu().render();
        new yp.v.FooterMenu();

        yp.v.whoWeAre = new yp.v.WhoWeAre().render();
        yp.v.services = new yp.v.Services().render();
        yp.v.cleanIdea = new yp.v.CleanIdea().render();
        yp.v.portfolio = new yp.v.Portfolio().render();
        yp.v.moreArea = new yp.v.MoreArea().render();
        new yp.v.Counting();
        yp.v.backToTop = new yp.v.BackToTop().render();
        setTimeout(function () {
            new yp.v.Loader().unrender();
        }, 1500);
    }

});