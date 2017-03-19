"use strict";
import request from 'request';
import express from 'express';
let router = express.Router();
const authKey = "mR4ZKTx6dQWXmsTw";


  router.post('/search', function(req, res){
    console.log("At least this happened");

    let axiosAddress = req.body.address;
    let axiosRadius = req.body.radius;
    let axiosCategoriesPreJoin = req.body.categories;
    let axiosCategories = axiosCategoriesPreJoin.join();

    let blankURL = "http://api.eventful.com/json/events/search?...&date=Future&app_key=" + authKey;
    let blankAddressSearch = blankURL + "&page_size=20&sort_order=popularity&location=";
    let addressSearch = blankAddressSearch + axiosAddress;
    let blankRadiusAddressSearch = addressSearch + "&units=mi&within=";
    let radiusAddressSearch = blankRadiusAddressSearch + axiosRadius;
    let blankRadAddCatSearch = radiusAddressSearch + "&category=";
    let radAddCatSearch = blankRadAddCatSearch + axiosCategories;
    console.log("complete URL: " + radAddCatSearch);

    request.get(radAddCatSearch, function(error, response, body){
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
