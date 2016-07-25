"use strict";

var Twitter = require("node-twitter-api"),
    secret = require("secret");



module.exports = function(req, res) {
    var twitter = new Twitter({
        consumerKey: "XbGn22t3mtbCWBw8nn37GEudZ",
        consumerSecret: "JDkUcqMF0QEfaLHrnXs97VWAPGx6nKnS3MJ6ce2gZUJOETPHgm",
        callback: "http://localhost:8000"
    });

    var _requestSecret;


    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        console.log(requestToken, requestSecret);
        if (err)
            res.status(500).send(err);
        else {
            _requestSecret = requestSecret;
            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
    });
};