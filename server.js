var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article={
 'article-one':{
    title:"Article one | Kriti Jain",
    heading:"article one",
    date:"sep 28, 2016",
    content:` <p>
                    This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.
                </p>
                <p>
                    This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.
                </p>
                <p>
                    This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.This is article one.
                </p> `
    
},
 'article-two':{
      title:"Article two | Kriti Jain",
    heading:"article two",
    date:"sep 5, 2016",
    content:` <p>
                    This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.
                </p>
                <p>
                    This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.
                </p>
                <p>
                    This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.This is article two.
                </p> `
    
 },
 'article-three':{ title:"Article three | Kriti Jain",
    heading:"article three",
    date:"sep 21, 2016",
    content:` <p>
                    This is article three. 
                </p>
                <p>
                    This is article three.
                </p>
                <p>
                    This is article three. 
                </p> `
    }
};
function createtemp(data){   
 var title=data.title;
 var heading=data.heading;
 var date=data.date;
 var content=data.content;
 var htmltemp=`<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width-devicewidth, initial-scale=1"/>
  <link href="/ui/style.css" rel="stylesheet" />
   
    </head>
    <body>
        <div class="c">
            <div>
                <a href='/'>Home</a>
            </div>
            <hr/>
            <h3>${heading}</h3>
            <div>
               ${date}
            </div>
            <div>
            ${content}
            </div>
        </div>
    </body>
</html>
`;
return htmltemp;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
   
   var articleName=req.params.articleName;
   res.send(createtemp(article[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
