var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) 
  {
  // this page is not supposed to receive GET requests, so redirect to index 
  res.redirect('/');
  })

// this route is generated after completing the form in the start route
router.post('/', function(req, res, next) 
  {
  console.log(req.body.user);
  name = req.body.user;
  cookieDetails = req.session.id;

  // start connection to the running mongo instance to the users DB, which contains name/sessionID pair
  MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db) 
    {
    if (err) throw err;
    console.log("Connected to Database");
    assert.equal(err, null);
    
    // find the session ID string. if it exists, there should only be one result
    var userFinder = db.collection('users').find({ "cookieDetails" : cookieDetails});
    userFinder.nextObject(function(err, doc) 
      {
      assert.equal(err, null);
      if (doc != null) 
        {
        console.log("Found user! Removing user to make room for new one."); 
        console.dir(doc);

        // remove old user to create room for new one and associate it with the cookie
        db.collection('users').remove({ "cookieDetails": cookieDetails}),
        function(err, result) 
          {
          assert.equal(err, null);
          console.log("An error occurred while removing old user.");
          callback(result);
          }

        // create new user and associate it with the session ID
        console.log("name is", name);
        db.collection('users').insertOne({ "name" : name , "cookieDetails": cookieDetails}),
        function(err, result) 
          {
          assert.equal(err, null);
          console.log("An error occurred while inserting new user.");
          callback(result);
          }
        req.session.username = name;
        console.log("Inserted a new user into the users collection,", req.session.username);
        db.close();
        } 
      else
        {
        console.log("Didn't find user.");

        // create new user and associate it with the session ID
        db.collection('users').insertOne({ "name" : name , "cookieDetails": cookieDetails}),
        function(err, result) 
          {
          assert.equal(err, null);
          console.log("An error occurred while inserting new user.");
          callback(result);
          }
        req.session.username = name;
        console.log("Inserted a new user into the users collection,", req.session.username);
        db.close();
        }
      });
    });
  // after user creation, re-use the load route to load the user into the game
  res.redirect('/load');
  })

module.exports = router;