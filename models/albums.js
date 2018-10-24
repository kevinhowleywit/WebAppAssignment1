


let mongoose = require('mongoose');

let AlbumSchema = new mongoose.Schema({
        AlbumName: String,
        Artist: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'albumsdb' });

module.exports = mongoose.model('Albums', AlbumSchema);