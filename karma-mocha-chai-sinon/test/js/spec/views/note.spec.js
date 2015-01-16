describe("App.Views.Note", function () {

    before(function () {
        // Regions for different views.
        if (typeof fixture !== 'undefined') {
            // KARMA
            fixture.base = 'test/js/spec/fixtures';
            this.$fixtures = $(fixture.load('fixtures.html'));
            //console.log('KARMA', $("#fixtures").html());
        }
        else {
            // BROWSER
            $("#fixtures").append($(
                "<div class='region-note' style='display:none;'></div>" +
                "<div class='region-notes' style='display:none;'></div>"
            ));
            this.$fixtures = $("#fixtures");
            //console.log('BROWSER', $("#fixtures").html());
        }

        // App.Views.Note fixture.
        if (typeof fixture !== 'undefined') {
            // KARAM
            this.$fixture = $(fixture.load('note.html'));
        }
        else {
            // BROWSER
            this.$fixture = $(
                "<div id='note-fixture region-note'>" +
                    "<div id='note-pane-view-content'></div>" +
                "</div>"
            );
        }

        // Any model changes will trigger a `model.save()`, which
        // won't work in the tests, so we have to fake the method.
        sinon.stub(App.Models.Note.prototype, "save");
    });

    beforeEach(function () {
        this.routerSpy = sinon.spy();

        if (typeof fixture !== 'undefined') {
            // KARMA
            this.$fixture.appendTo(this.$fixtures);
        }
        else {
            // BROWSER
            this.$fixture.appendTo($("#fixtures"));
        }

        this.view = new App.Views.Note({
            el: this.$fixture,
            model: new App.Models.Note()
        }, {
            nav: new Backbone.View(),
            router: {
                navigate: this.routerSpy
            }
        });
    });

    afterEach(function () {
        if (typeof fixture !== 'undefined') {
            // KARAM
        }
        else {
            // BROWSER
            this.$fixture.empty();
        }

        if (this.view) {
            this.view.model.destroy();
        }
    });

    after(function () {
        if (typeof fixture !== 'undefined') {
            // KARAM
            // fixture.cleanUp();
            // fixture.clearCache();
        }
        else {
            // BROWSER
            $("#fixtures").empty();
        }
        App.Models.Note.prototype.save.restore();
    });

    describe("view modes and actions", function () {

        it("navigates / displays 'view' by default", function () {
            expect(this.routerSpy).to.be.calledWithMatch(/view$/);

            // Check CSS visibility directly.  Not necessarily a best
            // practice as it uses intenral knowledge of the DOM, but
            // gets us a quick check on what should be the visible
            // view pane.
            //console.log(this.view.$("#note-pane-view"));
            expect(this.view.$("#note-pane-view").css("display")).to.not.equal("none");
            expect(this.view.$("#note-pane-edit").css("display")).to.equal("none");
        });

        it("navigates / displays 'edit' on event", function () {
            this.view.trigger("update:edit");
            expect(this.routerSpy).to.be.calledWithMatch(/edit$/);

            expect(this.view.$("#note-pane-edit").css("display")).to.not.equal("none");
            expect(this.view.$("#note-pane-view").css("display")).to.equal("none");
        });

        it("confirm note on delete", sinon.test(function () {
            this.stub(window, 'confirm').returns(false);
            this.view.deleteNote();
            expect(window.confirm)
                .to.have.been.calledOnce.and
                .to.have.been.calledWith("Delete note?");
        }));
    });

    describe("model interaction", function () {

        afterEach(function () {
            // Wipe out to prevent any further use.
            this.view = null;
        });

        it("is removed on destroyed model", sinon.test(function () {
            this.spy(this.view, "remove");
            this.spy(this.view.noteView, "remove");

            this.view.model.trigger("destroy");

            expect(this.view.remove).to.be.calledOnce;
            expect(this.view.noteView.remove).to.be.calledOnce;
        }));

    });

    describe("note rendering", function () {

        it.skip("can render a note", function () {
        });

        it("calls render on model events", sinon.test(function () {
            // Spy on `render` and check call/return value.
            this.spy(this.view, "render");

            this.view.model.trigger("change");

            expect(this.view.render)
                .to.be.calledOnce.and
                .to.have.returned(this.view);
        }));

        it("calls render on changed data", sinon.test(function () {
            this.spy(this.view, "render");

            // Replace form value and blue to force changes.
            this.view.$("#input-text").val("# A Heading!");
            this.view.$("#note-form-edit").blur();

            // `Note` view should have rendered.
            expect(this.view.render)
                .to.be.calledOnce.and
                .to.have.returned(this.view);

            // Check the `NoteView` view rendered the new markdown.
            expect(this.view.$("#pane-text").html())
                .to.match(/<h1 id=".*?">A Heading!<\/h1>/);
        }));
    });

});
