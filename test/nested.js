var detect = require('../');
var test = require('tape');

var expected = {};
var dir = __dirname + '/nested';
expected[dir + '/page1/package.json'] = {
	"view":"view.html",
	"main":"main.js",
	"__mainPath": dir + "/page1/main.js"
};

expected[dir + '/page2/package.json'] = {
	"view":"render.jade",
	"__mainPath": dir + "/page2/index.js"
};

require('./nested/page1/package.json');

test('nested', function (t) {
    t.plan(2);
    detect(dir, {}, function (err, parcels) {
        t.notOk(err);
        t.deepEqual(parcels, expected);
    });
});
