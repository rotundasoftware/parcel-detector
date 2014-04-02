var detect = require('../');
var test = require('tape');

var expected = {};

var dir = __dirname + '/detect';
expected[dir + '/page1/package.json'] = {
	"view":"view.html",
	"main":"main.js",
	"__mainPath": dir + "/page1/main.js"
};

expected[dir + '/page2/package.json'] = {
	"view":"render.jade",
	"__mainPath": dir + "/page2/index.js"
};

test('detect', function (t) {
    t.plan(2);
    detect(dir, {}, function (err, parcels) {
        t.notOk(err);
        t.deepEqual(parcels, expected);
    });
});
