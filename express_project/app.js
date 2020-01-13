const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req, res){
    res.render('index',{title: 'Welcome'});
});

app.get("/about",function(req, res){
    res.render('about');
});

app.get("/contact",function(req, res){
    res.render('contact');
});

app.post("/contact/send",function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:'akinolavictor26@gmail.com',
            pass: 'AAAaaa111'
        }
    });

    var mailOptions = {
        from: 'akinolavictor26@gmail.com',
        to: 'piusjoshua3@gmail.com',
        subject: 'NodeJS',
        text: 'you have a submission with the following details... Name: ' +req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
        html: '<p>you have a submission with the following details... Name: </p><ul><li>Name: ' +req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        }else{
            console.log('Message Sent: '+info.response, body.req.message);
        }
    });
    
});
app.listen(1498);