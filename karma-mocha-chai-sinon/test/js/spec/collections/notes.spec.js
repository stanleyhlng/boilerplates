describe("App.Collections.Notes", function () {

    before(function () {
        // Create a reference for all internal suites/specs.
        this.notes = new App.Collections.Notes();

        // Use internal method to clear out existing data.
        this.notes.localStorage._clear();
    });

    after(function () {
        // Remove the reference.
        this.notes = null;
    });

    describe("creation", function () {

        // Tests.
        it("has default values", function () {
            expect(this.notes).to.be.ok;
            expect(this.notes).to.have.length(0);
        });

        it("should be empty on fetch", function (done) {
            var notes = new App.Collections.Notes();

            // "reset" event fires on successful fetch().
            notes.once("reset", function () {
                expect(notes).to.have.length(0);

                // Async code has completed.  Signal test is done.
                done();
            });

            notes.fetch({reset: true});
        });

    });

    describe("modification", function () {

        beforeEach(function () {
            // Load a pre-existing note.
            this.notes.create({
                title: "Test note #1",
                text: "A pre-existing note from beforeEach."
            });
        });

        afterEach(function () {
            // Wipe internal data and reset collection.
            this.notes.localStorage._clear();
            this.notes.reset();
        });

        // Tests.
        it("has a single note", function (done) {
            var notes = this.notes,
                note;

            // After fetch.
            notes.once("reset", function () {
                expect(notes).to.have.length(1);

                // Check model attributes.
                note = notes.at(0);
                expect(note).to.be.ok;
                expect(note.get("title")).to.contain("#1");
                expect(note.get("text")).to.contain("pre-existing");

                done();
            });

            notes.fetch({reset: true});
        });

        it("can delete a note.", function (done) {
            var notes = this.notes,
                note;

            // After shift.
            notes.once("remove", function () {
                expect(notes).to.have.length(0);
                done();
            });

            // Remove and return first model.
            note = notes.shift();
            expect(note).to.be.ok;
        });

        it("can create a second note.", function (done) {
            done();
        });

    });

});
