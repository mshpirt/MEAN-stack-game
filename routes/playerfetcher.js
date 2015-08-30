var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// route that gets players from the database
router.get('/', function(req, res, next) 
	{
    
	// MongoClient.connect('mongodb://127.0.0.1:27017/players', function(err, db) 
  var uri = 'mongodb://testuser:apptest123@ds035683.mongolab.com:35683/heroku_td4242cl';
  MongoClient.connect(uri, function(err, db)
      {
    	if (err) throw err;
   		console.log("Connected to Database");
      assert.equal(err, null);

      var players = [];

      // find all the players
    	var playerFinder = db.collection('players').find({ });
    	playerFinder.each(function(err, doc) 
      		{
      		assert.equal(err, null);
      		if (doc != null) 
       			{
       			console.log("Found a player!");
       			players.push(doc);
        		} 
        	
      		else
        		{
              	// send data to controller when cursor is exhausted
        		console.log("No more players. Send the data.");
        		console.dir(players);

            // testing random player select
            //var random_entry = players[Math.floor(Math.random() * players.length)]
            // res.send(random_entry);

            // res.send(players);
            res.status(200).send(players);
        		db.close();
        		}
        	})
    	})
	})

module.exports = router;
