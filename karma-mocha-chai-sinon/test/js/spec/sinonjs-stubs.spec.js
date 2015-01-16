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

    });

});
