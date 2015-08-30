var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// load user information if their session cookie exists in db
router.get('/', function(req, res, next) 
  {
	checkCookie(req, res);
	console.log("We're in the load route. Cookie: ", req.cookies.managersession);
	sessionID = req.session.id;
	console.log("Session ID: ", sessionID)
	})

function checkCookie(req, res)
	{
	// if cookie data exists
	if (req.session && req.cookies.managersession)
		{
    var uri = 'mongodb://testuser:apptest123@ds035683.mongolab.com:35683/heroku_td4242cl';
		MongoClient.connect(uri, function(err, db) 
    // MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db)
    		{
    		if (err) throw err;
    		console.log("Connected to Database");
        assert.equal(err, null);

        // find the user based on session id
    		var userFinder = db.collection('users').find({ "cookieDetails" : sessionID });
    		userFinder.nextObject(function(err, doc) 
      			{
      			assert.equal(err, null);
      			if (doc != null) 
       				{
       				req.session.username = doc.name; 
              // var test = doc.name;// 
        			console.log("WELCOME BACK, ", req.session.username);
        			db.close();
        			// res.redirect('/game');
              // res.send("Welcome back, ", req.session.username);
              // res.status(200);
              // res.send("Welcome back, ", req.session.username);
              res.status(200).send(req.session.username);
        			} 
      			else
        			{
              // goes back to index if user isn't found
        			console.log("No user detected! Click to go back to index.");
        			db.close();
        			// res.send('No save found! Please go to New Game to create one!');
              res.status(200).send('No save found! Please go to New Game to create one!');
        			}
        		})
    		}
    	)}

	// else if no cookie data, redirect to index
	else
		{
		console.log("No cookie data");	
		res.redirect('/')
		}	
	};

// shouldn't be called, redirect to index just in case
router.post('/', function(req, res, next) 
  {
	res.redirect('/')
	})

module.exports = router;