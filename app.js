//jshint esversion:6

const express= require("express");
const bodyParser = require("body-parser");
// const request = require("request");

const app= express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("startpage");
});
app.get("/second",function(req,res){
  res.render("index");
  // res.send("hello");
});

// app.get("/fact", function(req,res){
//   request('https://cat-fact.herokuapp.com/facts', function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     //console.log('body:', body); // Print the HTML for the Google homepage.
//     var jsbody= JSON.parse(body);
//     var rand=Math.floor(Math.random() * 177);
//     var randfact= jsbody.all[rand].text;
//     console.log(randfact);
    // res.render("startpage");
//   });
// });

app.listen(3000, function(){
  console.log("Listening on port 3000");
});