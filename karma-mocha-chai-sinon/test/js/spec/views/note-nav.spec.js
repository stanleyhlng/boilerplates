describe("App.Views.NoteNav", function () {

    before(function () {
        // Set the minimum HTML that we will need to produce a menu bar list.
        if (typeof fixture !== 'undefined') {
            // KARMA
            fixture.base = 'test/js/spec/fixtures';
            this.$fixture = $(fixture.load('note-nav.html'));
        }
        else {
            // BROWSER
            this.$fixture = $(
                "<ul id='note-nav'>" +
                    "<li class='note-view'></li>" +
                    "<li class='note-edit'></li>" +
                    "<li class='note-delete'></li>" +
                "</ul>"
            );
        }
        //console.log(this.$fixture.html());
    });

    beforeEach(function () {
        if (typeof fixture !== 'undefined') {
            // KARMA
            // fixture.cleanUp();
            // fixture.clearCache();
        }
        else {
            // BROWSER
            this.$fixture.appendTo('#fixtures');
        }
        this.view = new App.Views.NoteNav({
            el: this.$fixture
        });
    });

    afterEach(function () {
        this.view.remove();
    });


    after(function () {
        if (typeof fixture !== 'undefined') {
            // KARMA
        }
        else {
            // BROWSER
            $("#fixtures").empty();
        }
    });

    describe("events", function () {
        it("fires events on 'view' click", function () {
            var navSpy = sinon.spy(),
                updateSpy = sinon.spy(),
                otherSpy = sinon.spy();

            this.view.on({
                "nav:view": navSpy,
                "nav:update:view": updateSpy,
                "nav:edit nav:update:edit": otherSpy,
                "nav:delete nav:update:delete": otherSpy
            });

            //this.$fixture.find(".note-view").click();
            this.view.$(".note-view").click();

            expect(navSpy).to.have.been.callOnce;
            expect(updateSpy).to.have.been.calledOnce;
            expect(otherSpy).to.not.have.been.called;
        });
    });

    describe("menu bar display", function () {
        it("has no active navs by default", function () {
            // Check no list items are active.
            expect(this.view.$("li.active")).to.have.length(0);

            // Another way - manually check each list nav.
            expect(this.view.$(".note-view").attr("class")).to.not.include("active");
            expect(this.view.$(".note-edit").attr("class")).to.not.include("active");
            expect(this.view.$(".note-delete").attr("class")).to.not.include("active");
        });
    });

    describe("updates nav on 'edit' click", function () {
        it("updates nav on 'edit' click", function () {
            this.view.$(".note-edit").click();
            expect(this.view.$(".note-edit").attr("class")).to.include("active");
        });

        it("updates nav on 'edit' event", function () {
            this.view.trigger("nav:update:edit");
            expect(this.view.$(".note-edit").attr("class")).to.include("active");
        });
    });

});
