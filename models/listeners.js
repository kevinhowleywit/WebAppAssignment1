
//models of structure
//will add extra
let mongoose = require('mongoose');

let ListenersSchema = new mongoose.Schema({
        Name: String,
        Password: String,
        Country: String,
        FavouriteArtist:String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'listenersdb' });

module.exports = mongoose.model('Listeners', ListenersSchema);