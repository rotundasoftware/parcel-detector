# parcel-detector

recursively detect whether a directory with a package.json is a parcel

[![build status](https://secure.travis-ci.org/rotundasoftware/parcel-detector.png)](http://travis-ci.org/rotundasoftware/parcel-detector)

# parcels

A parcel is a convention for defining a front-end asset management structure.

A parcel MUST have:

* a "view" field in package.json

A parcel MAY have:

* a "main" field
* static asset globs that may be read by
[parcel-map](https://npmjs.org/package/parcel-map)

# example

Suppose we have 3 directories in views/: page1, page2, and page3.

views/page1 is a valid parcel because its package.json has a view field:

``` json
{
  "view": "view.html",
  "main": "main.js"
}
```

views/page2 is a also valid parcel because its package.json has a view field:

``` json
{
  "view": "render.jade"
}
```

views/page2/sub is a valid parcel that is nested inside of views/page2:

``` json
{
  "view": "beep.html"
}
```

views/page3 is not a valid parcel because it does not have a `"view"` field:

``` json
{
  "name": "not a parcel"
}
```

Running parcel-detector on this directory structure with this detector:

``` js
var detect = require('parcel-detector');
detect(__dirname + '/views', function (err, parcels) {
    console.log(JSON.stringify(parcels, null, 2));
});
```

gives this output:

``` json
{
  "/home/substack/projects/parcel-detector/example/views/page1/package.json": {
    "view": "view.html",
    "main": "main.js"
  },
  "/home/substack/projects/parcel-detector/example/views/page2/package.json": {
    "view": "render.jade"
  },
  "/home/substack/projects/parcel-detector/example/views/page2/sub/package.json": {
    "view": "beep.html"
  }
}
```

# methods

``` js
var detect = require('parcel-detector')
```

## detect(opts, cb)

Resolve the directory starting at `opts.dir` recursively to find parcels.
`cb(err, parcels)` is called when the detection is complete with a map of
package.json paths to package.json contents for package.jsons that are
determined to be parcels.

If `opts` is a string, treat the string as the `opts.dir`.

# install

With [npm](https://npmjs.org) do:

```
npm install parcel-detector
```

# license

MIT
