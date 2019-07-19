const express = require("express");
const app = express();
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");



app.get('/',(req,res)=>{
    res.render('index');
});


app.get('/contact',(req,res)=>{
    res.render('contact');
});

app.get('/bio',(req,res)=>{
    res.render('bio');
});

app.get('/gallery',(req,res)=>{
    res.render('gallery');
});

app.get('*',(req,res)=>{
     res.redirect('/');
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Web app is up and running"); 
});