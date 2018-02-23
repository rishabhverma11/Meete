var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var multer = require('multer');
var md5 = require('md5');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // console.log(file);
        callback(null, './uploads/user');
    },
    filename: function(req, file, callback) {
        // console.log(file);
        var fileUniqueName = md5(Date.now());
        callback(null,  fileUniqueName + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });


var user_panel = require('./routes/user');
var port = process.env.port ||3003;

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

// For API
app.post('/user/login', user_panel.login);
app.post('/user/signup', user_panel.signup);
app.post('/user/createprofile', upload.any(), user_panel.createprofile);

app.listen(port, function(){
	console.log("Server is running on port "+port);
});