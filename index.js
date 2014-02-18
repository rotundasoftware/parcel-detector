var find = require('findit');
var fs = require('fs');
var path = require('path');

module.exports = function (opts, cb) {
    if (typeof opts === 'string') opts.dir = opts;
    var dirs = find(opts.dir);
    var parcels = {};
    dirs.on('file', function (file) {
        var full = path.resolve(opts.dir, file);
        if (path.basename(file) === 'package.json') {
            fs.readFile(full, 'utf8', function (err, src) {
                try { var pkg = JSON.parse(src) }
                catch (err) { return cb(err) }
                if (pkg && pkg.view) {
                    parcels[full] = pkg;
                }
            });
        }
    });
    dirs.on('end', function () {
        cb(null, parcels);
    });
};
