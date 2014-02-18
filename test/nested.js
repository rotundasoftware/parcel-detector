var detect = require('../');
var test = require('tape');

var expected = {};
var dir = __dirname + '/nested';
expected[dir + '/page1/package.json'] = require('./nested/page1/package.json');
expected[dir + '/page2/package.json'] = require('./nested/page2/package.json');
expected[dir + '/page2/page4/package.json'] = require('./nested/page2/page4/package.json');

test('nested', function (t) {
    t.plan(2);
    detect(dir, function (err, parcels) {
        t.notOk(err);
        t.deepEqual(parcels, expected);
    });
});
