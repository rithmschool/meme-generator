var express = require("express");
var app = express();
var cors = require('cors');
var request = require("request");
var bodyParser = require("body-parser");
var userRoutes = require("./routes/users");
var authRoutes = require("./routes/auth");
var memeRoutes = require("./routes/memes");
var authMiddleware = require("./middleware/auth");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.send("start with /api/users");
});

app.use('/api/users/:id/memes', /*authMiddleware.loginRequired,
        authMiddleware.ensureCorrectUser,*/ memeRoutes);
app.use('/api/users', authMiddleware.loginRequired, userRoutes);

app.use('/api/auth', authRoutes);

app.post('/meme', function(req, res, next) {
  const template_id = req.body.template_id;
  const text0 = req.body.top;
  const text1 = req.body.bottom;
  request.post({
    url: "https://api.imgflip.com/caption_image",
    form: {
      template_id,
      username: process.env.IMG_FLIP_USERNAME,
      password: process.env.IMG_FLIP_PASSWORD,
      text0,
      text1,
    }
  }, function(error, response, body) {
    eval(require('locus'));
  });
})

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
