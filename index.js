var find = require('findit');
var fs = require('fs');
var path = require('path');

module.exports = function( dir, opts, cb ) {
    var dirs = find( dir );
    var parcels = {};
    var pending = 1;

    dirs.on( 'file', function ( file ) {
        if( path.basename( file ) === 'package.json' ) {
            var full = path.resolve( dir, file );
            pending++;
            parsePackage( path.dirname( full ), opts.packageTransform, function( err, isParcel, pkg ) {
                if( isParcel ) parcels[full] = pkg;
                if (--pending === 0) done();
            } );
        }
    });

    dirs.on( 'end', function () {
        if( --pending === 0 ) done();
    });
    
    function done() {
        cb(null, parcels);
    }
};

var parsePackage = module.exports.parsePackage = function( pkgDirPath, packageTransform, callback ) {
    var pkgJsonPath = path.join( pkgDirPath, 'package.json' );

    fs.readFile( pkgJsonPath, 'utf8', function( err, src ) {
        var pkg;

        try {
            pkg = JSON.parse( src );
        }
        catch ( err ) { return callback( new Error( 'While parsing "' + pkgJsonPath + '", ' + err ) ); }

        if( packageTransform ) pkg = packageTransform( pkg, pkgDirPath );
      
        var isParcel = false;

        var mainPath = findMain( pkg, pkgDirPath );

        if( pkg && pkg.view ) {
            if( mainPath ) pkg.__mainPath = mainPath;
        }

        callback( null, !! pkg.__mainPath, pkg );
    } );
};

var isParcel = module.exports.isParcel = function( pkg, pkgDirPath ) {
    return( pkg.view && !! findMain( pkg, pkgDirPath ) );
};

var findMain = module.exports.findMain = function( pkg, pkgDirPath ) {
    var mainPath;

    if( pkg.browser && typeof pkg.browser === 'string' ) {
        mainPath = path.resolve( pkgDirPath, pkg.browser );
    }
    else if( pkg.main && pkg.browser ) {
        var bkeys = Object.keys( pkg.browser ).map( function( k ) {
            return path.relative( '.', k );
        } );
        var ix = bkeys.indexOf( pkg.main );
        if( ix >= 0 ) mainPath = path.resolve( pkgDirPath, bkeys[ i ] );
    }
    else if( pkg.main )
        mainPath = path.resolve( pkgDirPath, pkg.main );
    else {
        mainPath = path.resolve( pkgDirPath, 'index.js' );
    }

    return fs.existsSync( mainPath ) ? mainPath : null;
};