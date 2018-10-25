/*


ALL OLD FINDS AND METHODS


router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(albums, null, 5));

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var album;
    album = getByValue(albums, req.params.id);

    if (album != null)
        res.send(JSON.stringify(album,null,5));
    else
        res.send('Album wasnt Found!!');
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}


router.addAlbum = (req, res) => {
    //Adding an album to the list

    var id = Math.floor((Math.random() * 1000000) + 1);
    var currentSize = albums.length;

    albums.push({"id" : id, "AlbumName" : req.body.AlbumName, "Artist" : req.body.Artist, "upvotes" : 0});

    if((currentSize + 1) == albums.length)
        res.json({ message: 'Album added Added Successfully!'});
    else
        res.json({ message: 'Album wasnt added NOT Added!'});
}


router.deleteAlbum = (req, res) => {
    //Delete the selected album based on its id
    var album = getByValue(albums,req.params.id);
    var index = albums.indexOf(albums);

    var currentSize = albums.length;
    albums.splice(index, 1);

    if((currentSize - 1) == albums.length)
        res.json({ message: 'Album Deleted!'});
    else
        res.json({ message: 'Album NOT Deleted!'});
}

router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var album = getByValue(albums,req.params.id);

    if (album != null) {
        album.upvotes += 1;
        res.json({status : 200, message : 'UpVote Successful' , album : album });
    }
    else
        res.send('album wasnt Found and was not upvoted');

}

router.findTotalVotes = (req, res) => {

    let votes = getTotalVotes(albums);
    res.json({totalvotes : votes});
}




*/






let Album = require('../models/albums');

let albums = require('../models/albums');
let express = require('express');
let router = express.Router();


let mongoose = require('mongoose');
var album = require('../models/albums');
//specify the uri to connect
var mongodbUri =
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

    Album.findById(req.params.id, function(err,albums) {
        if (err)
            res.json({ message: 'Album wasnt found', errmsg : err } );
        else {
            album.upvotes += 1;
            album.save(function (err) {
                if (err)
                    res.json({ message: 'album wasnt upvoted', errmsg : err } );
                else
                    res.json({ message: 'album was upvoted!', data: album });
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

router.findTotalVotes = (req, res) => {

    Album.find(function(err, albums) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(albums) });
    });
}

module.exports = router;