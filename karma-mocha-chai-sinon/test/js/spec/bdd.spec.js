describe("BDD example", function () {

    // Runs once before all tests start.
    before(function () {
        this.hello = function () {
            return "Hello world!";
        };
    });

    // Runs once when all tests finish.
    after(function () {
        this.hello = null;
    });

    it("should return expected string result", function () {
        expect(this.hello()).to
        .be.a("string").and
        .equal("Hello world!");
    });

});
