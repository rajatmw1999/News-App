//jshint esversion:6

const express =  require('express');
const bodyParser = require('body-parser');
const request = require('request');
const lodash = require('lodash');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));
  app.get('/',function(req,res){
    var newsUrl = "https://newsapi.org/v2/top-headlines?apiKey=b78b7228021b496ba9eecf66e070ad57&sources=techcrunch";
    var newsResult;

    request(newsUrl,function(error,response,body){
      var newsResult = response.body;
       newsResult = JSON.parse(newsResult);
       newsResult = newsResult.articles;
      // console.log(newsResult.articles[0].title);

      res.render('home',{newsArticles:newsResult, type:"Tech"});
    });
  });

  app.get('/:type',function(req,res){
    var category = req.params.type;
    var newsUrl = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b78b7228021b496ba9eecf66e070ad57&category="+category;
    var newsResult;

    request(newsUrl,function(error,response,body){
      var newsResult = response.body;
       newsResult = JSON.parse(newsResult);
       newsResult = newsResult.articles;
      // console.log(newsResult.articles[0].title);
      var cate = lodash.upperFirst(category);
      res.render('home',{newsArticles:newsResult, type:cate});
  });});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})
