var detect = require('../');
var test = require('tape');

var expected = {"/Users/david_beck/Documents/git/parcel-finder/test/nested/page1/package.json":{"view":"view.html","main":"main.js","__mainPath":"/Users/david_beck/Documents/git/parcel-finder/test/nested/page1/main.js"},"/Users/david_beck/Documents/git/parcel-finder/test/nested/page2/package.json":{"view":"render.jade","__mainPath":"/Users/david_beck/Documents/git/parcel-finder/test/nested/page2/index.js"}};
var dir = __dirname + '/nested';

test('nested', function (t) {
    t.plan(2);
    detect(dir, {}, function (err, parcels) {
        t.notOk(err);
        t.deepEqual(parcels, expected);
    });
});
