yp.v.PortfolioModal = Backbone.View.extend({

    template: yp.v.template('#portfolio-modal-template'),

    events: {
        'click button': 'close',
        'hidden.bs.modal': 'hidden'
    },

    render: function () {
        this.setElement(this.template(this.model.toJSON()));
        $('body').prepend(this.el);
        this.$el.modal('show');
        return this;
    },

    unrender: function () {
        this.$el.on('hidden.bs.modal', function () {
            $(this).remove();
        });
        this.$el.modal('hide');
        return this;
    },

    close: function () {
        this.unrender();
    },

    hidden: function () {
        this.$el.remove();
    }

});