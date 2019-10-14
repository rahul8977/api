
var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'
);
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})



var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    
}));

app.post('/sign_up', function (req, res) {
    var data1 = req.body;
    var data = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.pass,
        "phone": req.body.phone
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        

        var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
              user: 'rahulsoni112233@outlook.com',
              pass: 'rahul90577'
            }
          });
          
          var mailOptions = {
            from: 'rahulsoni112233@outlook.com',
            to: `${data.email}`,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
         transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          console.log("Record inserted Successfully");
    });

    return res.redirect('signup_success.html');
})


app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3600)


console.log("server listening at port 3000"); 


