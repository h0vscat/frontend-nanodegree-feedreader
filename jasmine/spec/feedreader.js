/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        describe('each feed', function() {
            it('has a url', function() {
                for (feed of allFeeds) {
                    expect(feed.url).toBeDefined();
                    expect(feed.url).not.toBe(null);
                }
            })

            it('has a name', function() {
                for (feed of allFeeds) {
                    expect(feed.name).toBeDefined();
                    expect(feed.name).not.toBe(null);
                }
            })
        })
    });

    /* test suite: "The menu" */
    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        })

        it('display when clicked, hide when cliced again', function() {
            $('body').toggleClass('menu-hidden');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('body').toggleClass('menu-hidden');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    })

    /* test suite: "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, () => done());
        })
        it('has at least a single .entry element when loadFeed is called', () => expect($('.entry .feed')).toBeDefined());
    })

    /* test suite: "New Feed Selection" */
    describe('New Feed Selection', () => {
        let start;
        let end;
        beforeEach((done) => {
            loadFeed(0, () => {
                start = $('.feed');
                done();
            });
            loadFeed(1, () => {
                end = $('.feed');
                done();
            });
        });

        it('the content changes when a new feed is loaded', () => expect(start).not.toBe(end));
    })
}());