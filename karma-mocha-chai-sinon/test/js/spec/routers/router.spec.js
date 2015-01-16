describe.skip("App.Routers.Router", function () {

    // Default option: Trigger and replace history.
    var opts = {
        trigger: true,
        replace: true
    };

    beforeEach(function () {
        // Stub route methods.
        sinon.stub(App.Routers.Router.prototype, "note");
        sinon.stub(App.Routers.Router.prototype, "notes");

        // Create router with stubs and manual fakes.
        this.router = new App.Routers.Router();

        // Start history to enable routes to fire.
        Backbone.history.start();

        // Spy on all route events
        this.routeSpy = sinon.spy();
        this.router.on("route", this.routeSpy);
    });

    afterEach(function () {
        Backbone.history.stop();

        App.Routers.Router.prototype.note.restore();
        App.Routers.Router.prototype.notes.restore();
    });

    it("can route to note", function () {
        // this.router.navigate("note/1/edit", opts);
        //
        // // Check router method.
        // expect(App.Routers.Router.prototype.note)
        //     .to.have.been.calledOnce.and
        //     .to.have.been.calledWithExactly("1", "edit");
    });

});
