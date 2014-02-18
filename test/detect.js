var detect = require('../');
var test = require('tape');

var expected = {};
var dir = __dirname + '/detect';
expected[dir + '/page1/package.json'] = require('./detect/page1/package.json');
expected[dir + '/page2/package.json'] = require('./detect/page2/package.json');

test('detect', function (t) {
    t.plan(2);
    detect(dir, function (err, parcels) {
        t.notOk(err);
        t.deepEqual(parcels, expected);
    });
});
