describe("App.Views.NoteView", function () {

    before(function () {
        // Create test fixture.
        this.$fixture = $("<div id='note-view-fixture'></div>");
    });

    beforeEach(function () {
        // Empty out and rebind the fixture for each test.
        this.$fixture.empty().appendTo($("#fixtures"));

        // New default model and view for each test.
        //
        // Creation calls `render()`, so in tests we have an
        // *already rendered* view.
        this.view = new App.Views.NoteView({
            el: this.$fixture,
            model: new App.Models.Note()
        });

    });

    afterEach(function () {
        // Destroying the model also destroys the view.
        this.view.model.destroy();
    });

    after(function () {
        // Remove all subfixtures after test suite finishes.
        $("#fixtures").empty();
    });

    it("can render an empty note", function () {
        var $title = $("#pane-title"),
            $text = $("#pane-text");

        // Default to empty title in `h2` tag.
        expect($title.text()).to.equal("");
        expect($title.prop("tagName").toLowerCase()).to.equal("h2");

        // Have simple default message.
        expect($text.text()).to.equal("Edit your note!");
        expect($text.html()).to.contain("<p><em>Edit your note!</em></p>");

    });

    it("can render more complicated markdown", function (done) {
        this.view.model.once("change", function () {
            var $title = $("#pane-title"),
                $text = $("#pane-text");

            // Our new (changed) title.
            expect($title.text()).to.equal("My Title");

            // Rendered Markdown with headings, list.
            expect($text.html())
                .to.contain("My Heading</h2>").and
                .to.contain("<ul>").and
                .to.contain("<li>List item 2</li>");

            done();
        });

        // Make our note a little more complex.
        this.view.model.set({
            title: "My Title",
            text: "## My Heading\n" +
                  "* List item 1\n" +
                  "* List item 2"
        });
    });

});
