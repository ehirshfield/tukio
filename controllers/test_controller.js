import express from 'express';
let router = express.Router();
import request from 'request';

router.get('/search', (req, res) => {

  var authKey = "mR4ZKTx6dQWXmsTw";
  var queryURL = "http://api.eventful.com/json/events/search?...&keywords=books&location=San+Diego&date=Future&app_key=" + authKey;

    request(queryURL, function(error, response, body){
      if (error){
        console.log(error);
      }
      else {
        console.log("body: " + body);
        res.json(body);
      }
    });


});

export default router;
