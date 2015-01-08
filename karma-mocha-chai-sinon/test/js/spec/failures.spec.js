mocha.bail(false);

describe.skip("Test failures", function () {
    it("should fail on assertion", function () {
        expect("hi").to.equal("goodbye");
    });

    it("should fail on unexpected exception", function () {
        throw new Error();
    });
});
