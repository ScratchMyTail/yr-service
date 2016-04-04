var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


router.get('/location', function(req, res, next) {
    var lat = req.query.lat;
    var lng = req.query.lng;

    MongoClient.connect('mongodb://localhost:27017/yr', function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('steder').find({loc:{$near:{$geometry: {type: "Point", coordinates: [parseFloat(lat), parseFloat(lng)]}, $maxDistance: 5000}}}).limit(1).toArray(function(err, result) {
            if (err) {
                res.end(JSON.stringify({error: true}));
                throw err;
            }
            res.end(JSON.stringify({url: result[0].url}));
            console.log(result);
        });
    });
});

router.get('/sok', function(req, res, next) {
    var sok = req.query.sok;

    MongoClient.connect('mongodb://localhost:27017/yr', function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('steder').find({"sted": {'$regex': new RegExp(sok, "i")}}).limit(10).toArray(function(err, result) {
            if (err) {
                res.end(JSON.stringify({error: true}));
                throw err;
            }
            res.end(JSON.stringify(result));
            console.log(result);
        });
    });
});

module.exports = router;
