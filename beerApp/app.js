var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    request = require("request");


mongoose.connect('mongodb://localhost/beer');

var beerSchema = new mongoose.Schema({
  date: String,
  name: String,
  drinker: String,
  score: Number,
  location: String,
  brewery: String,
  description: String,
  size: String,
  drunk: String,
  latLong: Object,
})

var beer = mongoose.model("beer", beerSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
  res.render("home")
})

app.post("/addBeer", function(req, res){
  var beerName = req.body.name,
      beerDrinker = req.body.drinker,
      beerBrewery = req.body.brewery,
      beerLocation = req.body.location,
      beerDescription = req.body.description,
      beerDate = req.body.date,
      beerScore = req.body.score,
      beerDrunk = req.body.drunk,
      beerSize = req.body.size;
  
  
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+beerLocation+"&key=AIzaSyA60dGR3kugo19bbYVSIZl3bUYsNQ6nbiw";
    request(url, function(error, response, body){
      var parsedData = JSON.parse(body);
      
      var longLat = parsedData.results[0].geometry.location
      
      beer.create({
        date: beerDate,
        drinker: beerDrinker,
        name: beerName,
        description: beerDescription,
        brewery: beerBrewery,
        location: beerLocation,
        drunk: beerDrunk,
        score: beerScore,
        size: beerSize,
        latLong: longLat,
      })
     res.redirect("results");
  })  
})

app.get("/results",function(req, res){
  beer.find({}, function(err, beers){
    res.render("results", {data:beers})
  })
})

app.get("/test", function(req,res){
  beer.find({}, function(err, beers){
    res.render("test", {data:beers})
  })

})

app.listen(3000, function(){
  console.log("BEER APP BACK!!!!")
})