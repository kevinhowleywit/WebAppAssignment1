var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//variable for albums
const albums = require("./routes/albums");
//variable for listeners
const listeners=require("./routes/listeners");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


//ROUTES FOR ALBUMS
//get routes
app.get('/albums/', albums.findAll);
app.get('/albums/:id', albums.findOne);
app.get('/albums/getByAlbumName/:AlbumName/',albums.findAllInAlbum);
app.get('/albums/getBySongName/:SongName/',albums.findSong);
//app.get('/albums/fuzzy/SongName/',albums.fuzzySearch);

//put routes
app.put('/albums/:id/vote', albums.incrementUpvotes);
app.put('/albums/:id/downvote', albums.downvote);
//post route
app.post('/albums',albums.addAlbum);
//delete route
app.delete('/albums/:id', albums.deleteAlbum);

//ROUTES FOR LISTENERS
//get routes
app.get('/listeners/', listeners.findAll);
app.get('/listeners/:id', listeners.findOne);
app.get('/listeners/getByFaveArtist/:FavouriteArtist/',listeners.getByFavArtist);
//put routes
app.put('/listeners/:id/vote', listeners.incrementUpvotes);
app.put('/listeners/:id/downvote', listeners.downvote);
// post routes
app.post('/listeners',listeners.addListener);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
