var express = require('express');
var router = express.Router();
var spawn = require("child_process").spawn;
var process = null;

var phantom = require('x-ray-phantom');
var Xray = require('x-ray');

var x = Xray();
// Allows us to generate dynamic content
// var x = Xray().driver(phantom({'webSecurity':'no'}));

router.get('/api/user', function(req, res) {
  if (req.session && req.session.user) {
    res.status(200).send(req.session.user);
  }
  else {
    res.status(400).send("");
  }
});

router.get('/api/realtor', function(req, res) {
  console.log(req.query.zip);
  x('http://www.realtor.com/realestateandhomes-search/' + req.query.zip, '.list-unstyled', [{
    address: {
      address: '.listing-street-address',
      city: '.listing-city',
      region: '.listing-region'
    },
    price: '.srp-item-price' 
  }])(function(err, data) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      var validListings = [];
      data.forEach(function(listing) {
        if (listing.address && listing.address.address) {
          listing.price = listing.price.trim();
          validListings.push(listing);
        }
      });
      console.log(validListings);
      res.status(200).send(validListings);
    }
  });
});

module.exports = router;
