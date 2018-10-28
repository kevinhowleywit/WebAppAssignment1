let Listener = require('../models/listeners');

let listeners = require('../models/listeners');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var listener = require('../models/listeners');
//specify the uri to connect
var mongodbUri ='';
mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});



router.findAll = (req, res) => {

    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    listeners.find(function(err, listeners) {
        if (err)
            res.send(err);
        else
            res.send(JSON.stringify(listeners,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    listener.find({ "_id" : req.params.id },function(err, listeners) {
        if (err)
            res.send(err)
        else
            res.send(JSON.stringify(listeners,null,5));
    });



}

router.getByFavArtist=(req,res) =>{

        res.setHeader('Content-Type', 'application/json');

        listener.find({ "FavouriteArtist" : req.params.FavouriteArtist },function(err, listeners) {
            if (err)
                res.send(err)
            else
                res.send(JSON.stringify(listeners,null,5));
        });
}

router.incrementUpvotes = (req, res) => {

    listeners.findById(req.params.id, function(err,listeners) {
        if (err)
            res.json({ message: 'Listener wasnt found', errmsg : err } );
        else {
            listeners.upvotes += 1;
            listeners.save(function (err) {
                if (err)
                    res.json({ message: 'listener wasnt upvoted', errmsg : err } );
                else
                    res.json({ message: 'listener was upvoted!', data: listener });
            });
        }
    });
}

router.downvote = (req, res) => {

    listeners.findById(req.params.id, function(err,listeners) {
        if (err)
            res.json({ message: 'Listener wasnt found', errmsg : err } );
        else {
            listeners.upvotes -= 1;
            listeners.save(function (err) {
                if (err)
                    res.json({ message: 'listener wasnt downvoted', errmsg : err } );
                else
                    res.json({ message: 'listener was downvoted!', data: listener });
            });
        }
    });
}




module.exports = router;