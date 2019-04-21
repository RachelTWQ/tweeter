"use strict";

const Mongo = require("mongodb");

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        
        db.collection("tweets").find().toArray(
          (err, tweets) => {
            if(err) {
                throw err;
            }
            const sortNewestFirst = (a, b) => a.created_at - b.created_at;
            callback(null, tweets.sort(sortNewestFirst));
        });
      });
    },

    // Update tweets in db
    updateTweet: function(id, update, callback) {
      console.log("id from data-helper ", id)
      console.log("update from data-helper ", update)
      simulateDelay(() => {
        console.log("saving....")
        db.collection("tweets").updateOne({"_id": Mongo.ObjectId(id)}, { $set: update }, {upsert: true});
        console.log("saved")
        callback(null, true);
      });
    }
  };
}
