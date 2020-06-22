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
app.get("/last",function(req,res){
  res.render("gameover");
  // res.send("hello");
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});