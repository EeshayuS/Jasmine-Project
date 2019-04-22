/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We"re placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don"t run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length > 0).toBeTruthy();
        });

        /* Loops through each feed in the allFeeds object 
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("has URL defined", function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.name.length > 0).toBeTruthy();
            }
        });

        /* Loops through each feed in the allFeeds
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("has URL defined", function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            }
        });
    }); 

    describe("The menu", function() {

        const body = $("body");

        // Ensures the menu element is hidden by default.

        it("is hidden", function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes visibility
         * when the menu icon is clicked.
         */

        it("changes visibility", function() {
            $('a.menu-icon-link').trigger("click");
            expect(body.hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger("click");
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

         /* Ensures when the loadFeed function 
         * is called and completes its work, 
         * there is at least a single .entry 
         * element within the .feed container.
         */

    describe("Initial Entries", function() {

        const feed = $(".feed");

        beforeEach(function(done) {
            window.loadFeed(0, done);
        });
       
        it("has loaded", function(done) {
            expect(feed.children().length > 0).toBeTruthy();
            done();
        });
    });

        /* Ensures when a new feed is loaded
         * by the loadFeed function that the 
         * content actually changes.
         */

    describe("New Feed Selection", function() {

        let oldFeed, newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $(".feed");
                
                loadFeed(1, function () {
                    newFeed = $(".feed");
                    done();
                });
            });
            
        });
       
        it("changed feed", function(done) {
            expect(oldFeed).not.toBe(newFeed);
            done();
        });
    });

}());
