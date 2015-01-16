describe("App.Views.NotesItem", function () {

    before(function () {
        this.navigate = sinon.stub();
        this.view = new App.Views.NotesItem({
            model: new App.Models.Note({
                id: "0",
                title: "title"
            })
        }, {
            router: {
                navigate: this.navigate
            }
        });
    });

    afterEach(function () {
        this.navigate.reset();
    });

    after(function () {
        this.view.remove();
    });

    describe("remove", function () {

        it("is removed on model destroy", sinon.test(function () {
            // Empty stub for view removal to prevent side effect.
            this.stub(this.view, "remove");
            this.view.model.trigger("destroy");
            expect(this.view.remove).to.be.calledOnce;
        }));

    });

    describe("render", function () {

        // One way to verify is with a stub.
        it("renders on model change w/ stub", sinon.test(function () {
            this.stub(this.view);
            this.view.model.trigger("change");
            expect(this.view.render).to.have.been.calledOnce;
        }));

        // Here is another way to do the same check with a mock.
        it("renders on model change w/ mock", sinon.test(function () {
            var exp = this.mock(this.view).expects("render").once();
            this.view.model.trigger("change");
            exp.verify();
        }));

    });

    describe("actions", function () {

        it.skip("views on click", function () {
            this.view.$(".note-view").click();

            expect(this.navigate)
                .to.be.calledOnce.and
                .to.be.calledWith("note/0/view");
        });

        it.skip("edits on click", function () {
            this.view.$(".note-edit").click();

            expect(this.navigate)
            .to.be.calledOnce.and
            .to.be.calledWith("note/0/edit");
        });

        it.skip("deletes on click", function () {
            this.view.$(".note-delete").click();

            expect(this.navigate).to.be.calledOnce;
        });

    });

});
