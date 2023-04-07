
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');


const homeStartingContent = "I am Nasir Daneshiar I am a programmer and an engineer, in this weblog I want to share with you about new technologies, AI, IOT, Web3, and ...";
const aboutContent = "I am a full stack web developer, Node.js(express) and React, and also web 3 development, Solidity, and Motoko(the language for internet computer protocol). I am also an Artificial intelligence specialist who can solve computer vision and NLP tasks.    My university education is about robotics and Mechatronics, I worked for 2 years at Behyaar company as an FPGA and LabVIEW programmer. after that, I started a startup about AI in financial markets but after 3 years I decided to change my carrier.I'm very interested in the web(3), AI, and the Internet of robotic things.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts= [];

//////////////////////////////////////////////////////////////

const mongoose = require("mongoose")

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/Weblog');

const postSchema = new mongoose.Schema({
    titlePost : String,
    bodyPost : String
});


const Post = mongoose.model("post",postSchema)

const post1 = new Post({
    titlePost:"Who am I?",
    bodyPost:"I am a full stack web developer, Node.js(express) and React, and also web 3 development, Solidity, and Motoko(the language for internet computer protocol). I am also an Artificial intelligence specialist who can solve computer vision and NLP tasks.    My university education is about robotics and Mechatronics, I worked for 2 years at Behyaar company as an FPGA and LabVIEW programmer. after that, I started a startup about AI in financial markets but after 3 years I decided to change my carrier.I'm very interested in the web(3), AI, and the Internet of robotic things."
  })
//////////////////////////////////////////////////////////////

app.get ("/",async function(req,res){
    const elems=await Post.find();
    if (elems.length === 0){
        post1.save();
        res.redirect("/")
    }else{
        res.render("home",{text:homeStartingContent,Posts:elems});
    }
    }
);
        


app.get ("/aboutMe",function(req,res){
    res.render("about",{text :aboutContent});
});
app.get ("/contact",function(req,res){
    res.render("contact",{text :contactContent})
});

app.get ("/"+process.env.Write,function(req,res){
    res.render("compose")
});

app.get ("/posts/:title",async function(req,res){
    const requestedTitle = _.lowerCase(req.params.title);
    
    const elems = await Post.find()
    elems.forEach(elem =>{
            if(_.lowerCase(elem.titlePost) === requestedTitle){
                res.render("post",{
                    title: elem.titlePost,
                    body : elem.bodyPost
                });
            }
    })
    
});

app.post ("/compose",function(req,res){
    const newpost = new Post({
        titlePost:req.body.Title,
        bodyPost : req.body.Context
    })
    newpost.save();  
    res.redirect("/")
})

app.listen(port,function(){
    console.log("Server started on port 3000");
});