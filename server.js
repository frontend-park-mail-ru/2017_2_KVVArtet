'use strict';

var db = require('./public/db');
var Strategy = require('passport-local').Strategy;
var express = require('express');
var app = express();
var passport = require('passport');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'myCookie', resave: false, saveUninitialized: false }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(
    function(username, password, cb) {
        db.users.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password !== password) { return cb(null, false); }
            return cb(null, user);
        });
    }));


passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});


app.get('*', (req, res) => {
    // res.send('404');
    res.redirect('/error.html')

});


app.get('/', function (req, res) {
    res.render('index.html');
});



app.get("/register,html", function(req, res) {
    res.render("register.html");
});


app.post('/register.html', db.users.registration);

app.get('/login.html',
    function(req, res){
        res.render('login,html');
    });

app.post('/login.html',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });


app.listen(process.env.PORT || '8000', function () {
    console.log('Hello, fucking world !');
});


