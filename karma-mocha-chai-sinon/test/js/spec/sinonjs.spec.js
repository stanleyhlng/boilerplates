describe("Sinon.JS", function () {

    describe("Spies", function () {

        it("calls anonymous spy on event", function () {
            // Anonymous spies
            var eventer = _.extend({}, Backbone.Events),
                spy = sinon.spy();

            // Set up the spy.
            eventer.on("foo", spy);
            expect(spy.called).to.be.false;

            // Fire events.
            eventer.trigger("foo", 42);

            // Check number of calls.
            expect(spy.calledOnce).to.be.true;
            expect(spy.callCount).to.equal(1);

            // Check calling argument
            expect(spy.firstCall.args[0]).to.equal(42);
            expect(spy.calledWith(42)).to.be.true;

        });

        it("verifies anonymous spy on event", function () {
            // Spy assertions
            var eventer = _.extend({}, Backbone.Events),
                spy = sinon.spy();

            eventer.on("foo", spy);
            sinon.assert.notCalled(spy);

            eventer.trigger("foo", 42);
            sinon.assert.callCount(spy, 1);
            sinon.assert.calledWith(spy, 42);
        });
        
    });

});
