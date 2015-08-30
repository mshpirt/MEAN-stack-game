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

      var numPlayers;
      var countPlayers = db.collection('players');
      countPlayers.count(function(err, count) 
        {
        assert.equal(null, err);
        // console.dir(count);
        numPlayers = count;
        // console.log("Inside: ", numPlayers);
        

        console.log("Number of players found: ", numPlayers);
        // var count = 4;
        // console.log(count);
        var rand = function(){return Math.floor( Math.random() * numPlayers )}
        // console.log(rand);

        var randomPlayerFinder = db.collection('players').find().limit(-1).skip(rand());
        randomPlayerFinder.each(function(err, doc) 
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
            // res.send(players);
            res.status(200).send(players);
            db.close();
            }
          })
        })
    	})
	})

module.exports = router;
