var find = require('findit');
var fs = require('fs');
var path = require('path');

module.exports = function (opts, cb) {
    if (typeof opts === 'string') opts = { dir: opts };
    var dirs = find(opts.dir);
    var parcels = {};
    var pending = 1;
    
    dirs.on('file', function (file) {
        var full = path.resolve(opts.dir, file);
        if (path.basename(file) === 'package.json') {
            pending ++;
            fs.readFile(full, 'utf8', function (err, src) {
                try { var pkg = JSON.parse(src) }
                catch (err) { return cb(err) }
                if (pkg && pkg.view) {
                    parcels[full] = pkg;
                }
                if (--pending === 0) done();
            });
        }
    });
    dirs.on('end', function () {
        if (--pending === 0) done();
    });
    
    function done () {
        cb(null, parcels);
    }
};
