var express = require('express');
var path = require('path');
var cron = require('node-cron');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var smtpPool =require('nodemailer-smtp-pool');
app.use(bodyParser.json())



var port=process.env.PORT||3000;


app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded( { extended: false } ));





var transporter = nodemailer.createTransport(smtpPool({
  service: 'Gmail',
  auth: {
    user: 'devajitgupta@gmail.com',
    pass: 'Ajit@123',
  }
}));

app.post('/send-email', function(req, res) {
    var mailOptions = {
        from: 'devajitgupta@gmail.com', // sender address
        to: req.body.to, // list of receivers, // Subject line
        html: req.body.msg,


    };
    cron.schedule('* * *', () => {
      
       transporter.sendMail(mailOptions,function(error, info) {


         if (error) {
             return console.log(error);
         }
      
         //console.log('Message sent: ' + info.response);
     });

     res.redirect("./submit.html");

     });
  });


app.listen(port,function(req,res){
  console.log("server running" +port);
})

