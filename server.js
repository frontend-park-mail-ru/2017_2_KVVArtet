'use strict';

const path = require('path');
var db = require('./public/db');
var Strategy = require('passport-local').Strategy;
var express = require('express');
var app = express();
var passport = require('passport');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'myCookie', resave: false, saveUninitialized: false }));
app.use('/', express.static(__dirname + '/public'));

app.engine('html', require('pug').renderFile);
app.set('view engine', 'pug');

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


app.get('/', function (req, res) {
    app.set('views', path.join(__dirname,'/public/templates'));
    res.render( __dirname + '/public/templates/index.pug');
});


app.get('/login', function(req, res) {
    res.render(__dirname + '/public/blocks/login/login.pug');
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/registration', function(req, res) {
    app.set('views', path.join(__dirname,'/public/blocks/registration'));
    res.render(__dirname + '/public/blocks/registration/registration.pug');
});

app.post('/registration', db.users.registration);
app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });

app.get('/game', function(req, res) {
 //  app.set('views', path.join(__dirname,'/public/blocks/registration/game.pug'));
    res.render( __dirname + '/public/blocks/registration/game.pug');
});

app.get('/info', function(req, res) {
    //  app.set('views', path.join(__dirname,'/public/blocks/registration/game.pug'));
    res.render( __dirname + '/public/blocks/information/info.pug');
});

app.listen(process.env.PORT || '8000', function () {
    console.log('Hello, fucking world !');
});



