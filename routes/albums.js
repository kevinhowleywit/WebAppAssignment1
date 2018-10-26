//Kevin Howley
//20078896
//Got help from Daemon Macklin
//A lot of code used is based from the labs in class. It can be found at from https://ddrohan.github.io
let Album = require('../models/albums');

let albums = require('../models/albums');
let express = require('express');
let router = express.Router();


let mongoose = require('mongoose');
var album = require('../models/albums');
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

    album.find(function(err, albums) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(albums,null,5));
    });
}





router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    album.find({ "_id" : req.params.id },function(err, albums) {
        if (err)
            res.send(err)
        else
            res.send(JSON.stringify(albums,null,5));
    });




}


//this will find all songs in an album
router.findAllInAlbum=(req,res) =>{

    res.setHeader('Content-Type', 'application/json');

    album.find({ "AlbumName" : req.params.AlbumName },function(err, albums) {
        if (err)
            res.send(err)
        else
            res.send(JSON.stringify(albums,null,5));
    });
}

//this method will by song
router.findSong=(req,res) =>{

    res.setHeader('Content-Type', 'application/json');

    album.find({"SongName" : req.params.SongName},function (err,albums) {
        if(err)
            res.send(err)
        else
            res.send(JSON.stringify(albums,null,5))

    })
}

router.addAlbum = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var album = new Album();

    album.AlbumName = req.body.AlbumName;
        album.Artist =req.body.Artist;
        album.SongName=req.body.SongName;

            album.save(function(err) {
                if (err)
                    res.json({ message: 'Album wasnt added', errmsg : err } );
                else
                    res.json({ message: 'Album was successfully added!', data: album });
            });
}


router.incrementUpvotes = (req, res) => {

    albums.findById(req.params.id, function(err,albums) {
        if (err)
            res.json({ message: 'Album wasnt found', errmsg : err } );
        else {
            albums.upvotes += 1;
            albums.save(function (err) {
                if (err)
                    res.json({ message: 'album wasnt upvoted', errmsg : err } );
                else
                    res.json({ message: 'album was upvoted!', data: album });
            });
        }
    });
}
//downvotes an album
router.downvote = (req, res) => {

    albums.findById(req.params.id, function(err,albums) {
        if (err)
            res.json({ message: 'Album wasnt found', errmsg : err } );
        else {
            albums.upvotes -= 1;
            albums.save(function (err) {
                if (err)
                    res.json({ message: 'album wasnt downvoted', errmsg : err } );
                else
                    res.json({ message: 'album was downvoted!', data: album });
            });
        }
    });
}



router.deleteAlbum = (req, res) => {

    Album.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Album wasnt deleted', errmsg : err } );
        else
            res.json({ message: 'album deleted'});
    });
}

module.exports = router;