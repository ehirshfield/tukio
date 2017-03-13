"use strict";
import request from 'request';
import express from 'express';
let router = express.Router();
const authKey = "mR4ZKTx6dQWXmsTw";


  router.post('/search', function(req, res){
    console.log("At least this happened");

    let axiosAddress = req.body.address;
    let axiosRadius = req.body.radius;

    let blankURL = "http://api.eventful.com/json/events/search?...&date=Future&app_key=" + authKey;
    let blankAddressSearch = blankURL + "&location=";
    let addressSearch = blankAddressSearch + axiosAddress;
    let blankRadiusAddressSearch = addressSearch + "&units=mi&within=";
    let radiusAddressSearch = blankRadiusAddressSearch + axiosRadius;
    console.log("complete URL: " + radiusAddressSearch);

    request.get(radiusAddressSearch, function(error, response, body){
      if (error){
        console.log("error on request call: " + error);
        console.log('statusCode:', response && response.statusCode);
      }
      else{
        console.log('statusCode:', response && response.statusCode);
        console.log("BODY: " + body);
        return res.send(body);
      }
    })
  });

export default router;
