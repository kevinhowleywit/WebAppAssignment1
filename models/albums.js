/*const albums = [
    {id: 1000000, AlbumName: 'Taboo', Artist: 'Denzel Curry', upvotes: 1},
    {id: 1000001, AlbumName: 'LivingSucks', Artist: 'Bones', upvotes: 2},
    {id: 1000002, AlbumName: 'Powder', Artist: 'Bones', upvotes: 1},
    {id: 1000002, AlbumName: 'Insurrection', Artist: 'Killstation', upvotes: 1}

];

module.exports = albums;
*/

let mongoose = require('mongoose');

let AlbumSchema = new mongoose.Schema({
        AlbumName: String,
        Artist: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'albumsdb' });

module.exports = mongoose.model('Albums', AlbumSchema);