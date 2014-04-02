var detect = require('../');
var test = require('tape');

var expected = {"/Users/david_beck/Documents/git/parcel-finder/test/detect/page1/package.json":{"view":"view.html","main":"main.js","__mainPath":"/Users/david_beck/Documents/git/parcel-finder/test/detect/page1/main.js"},"/Users/david_beck/Documents/git/parcel-finder/test/detect/page2/package.json":{"view":"render.jade","__mainPath":"/Users/david_beck/Documents/git/parcel-finder/test/detect/page2/index.js"}};
var dir = __dirname + '/detect';

test('detect', function (t) {
    t.plan(2);
    detect(dir, {}, function (err, parcels) {
        t.notOk(err);
        t.deepEqual(parcels, expected);
    });
});
