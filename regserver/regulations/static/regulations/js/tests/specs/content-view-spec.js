define(['jquery', 'underscore', 'backbone', 'reg-view', 'definition-view'], function($, _, Backbone, RegView, DefinitionView) {
    describe("Reg view", function() {
        Dispatch = {
            on: function() {},
            set: function() {}
        };

        $('body').append('<div id="content"></div>');
        contentView = new RegView({el: '#content'});

        it("should have a content view instance", function() {
            expect(contentView).to.be.ok();
        });

        describe("openDefinition", function() {
            $link = $('<a id="123-2" href="#123-2" class="definition"></a>');
            defView = contentView.openDefinition('123-2', $link);

            it("should give the link an active class", function() {
                expect($link.hasClass('active')).to.be.ok();
            });

            it("should create and return a definition view", function() {
                expect(defView.model.id).to.be('123-2');
            });
        });

        describe("setActiveTerm", function() {
            $('#content').append('<a id="123-3" href="#123-3" class="definition"></a><a href="#123-4" class="definition active"></a>');
            contentView.setActiveTerm($('#123-3'));

            it("should remove all other active terms", function() {
                expect($('#123-4').hasClass('active')).to.not.be.ok();
                expect($('#123-2').hasClass('active')).to.not.be.ok();
            });

            it("should give the link an active class", function() {
                expect($('#123-3').hasClass('active')).to.be.ok();
            });

            it("should give the link a data attr", function() {
                expect($('#123-3').data('active')).to.be(1);
            });

            it("123-2 should not still have an active data attr", function() {
                expect($('#123-2').data('active')).to.to.not.be.ok();
            });
        });

        describe("clearActiveTerms", function() {
            it("should eliminate all active classes on links", function() {
                contentView.clearActiveTerms();
                expect($('#content .active').length).to.be(0);
            });

            it("should remove all active data attrs", function() {
                expect($('#123-2').data('active')).to.not.be.ok();
                expect($('#123-3').data('active')).to.not.be.ok();
                expect($('#123-4').data('active')).to.not.be.ok();
            });
        });
    });
});
