describe("Sinon.JS", function () {

    var obj = {
        multiply: function (a, b) {
            return a * b;
        },
        error: function (msg) {
            throw new Error(msg);
        }
    };

    describe("Stubs", function () {

        it("stubs multiply", function () {
            // Stub wijth a hard-coded return value.
            sinon.stub(obj, "multiply").returns(5);
            expect(obj.multiply(1, 2)).to.equal(5);
            obj.multiply.restore();

            // Stub with a function
            sinon.stub(obj, "multiply", function (a, b) {
                return a + b;
            });
            expect(obj.multiply(1, 2)).to.equal(3);
            obj.multiply.restore();
        });

        it("stub error", sinon.test(function () {
            this.stub(obj, "error");
            expect(obj.error).to.not.throw();
        }));

        it("stub with yields", function (done) {
            var obj = {
                async: function (callback) {
                    callback("a", "b");
                }
            };

            sinon.stub(obj, "async").yields(1, 2);

            // Verify stub calls with (1, 2), *not* ("a", "b").
            obj.async(function (first, second) {
                expect(first).to.equal(1);
                expect(second).to.equal(2);

                obj.async.restore();
                done();
            });
        });

        describe("Testing Backbone.js component with stubs", function () {

            var MyView = Backbone.View.extend({

                initialize: function () {
                    this.on('wrapped', function () {
                        this.foo();
                    });
                    this.on('unwrapped', this.foo);
                },

                foo: function () {
                    return "I'm real.";
                }

            });

            it("stubs after initialization", sinon.test(function () {
                var myView = new MyView();

                // Stub prototype **after** initialization.
                // Equivalent to:
                // this.stub(myView, "foo").returns("I'm fake.");
                this.stub(MyView.prototype, "foo").returns("I'm fake.");

                // The wrapped version calls the **stub**
                myView.foo.reset();
                myView.trigger("wrapped");
                expect(myView.foo)
                    .to.be.calledOnce.and
                    .to.have.returned("I'm fake.");

                // However, the unwrapped version calls the **real** function.
                myView.foo.reset();
                myView.trigger("unwrapped");
                expect(myView.foo).to.not.be.called;
            }));

            it("stubs before initialization", sinon.test(function () {
                // Stub prototype **before** initialziation.
                this.stub(MyView.prototype, "foo").returns("I'm fake.");

                var myView = new MyView();

                // Now, both versions are correctly stubbed.
                myView.foo.reset();
                myView.trigger("wrapped");
                expect(myView.foo)
                    .to.be.calledOnce.and
                    .to.have.returned("I'm fake.");

                myView.foo.reset();
                myView.trigger("unwrapped");
                expect(myView.foo)
                    .to.be.calledOnce.and
                    .to.have.returned("I'm fake.");
            }));

        });

    });

});
