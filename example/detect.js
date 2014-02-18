var detect = require('../');
detect(__dirname + '/views', function (err, parcels) {
    console.log(JSON.stringify(parcels, null, 2));
});
