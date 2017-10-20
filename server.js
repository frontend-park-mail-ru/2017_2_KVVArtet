'use strict';

const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const uuid = require('uuid/v4');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(body.json());
app.use(cookie());

app.use(cors({
    origin: true,
    credentials: true,
}));

app.get('*', (req, res) => {
    res.send('404');
});

const port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('Server listening port ${port}');
});

app.post('/signin', function (req, res) {
    const login = req.body.login;
    const password = req.body.password;

    if (!password || !login) {
        return res.status(400).json({error: 'no email or password'});
    }
    if (!users[login] || users[login].password !== password) {
        return res.status(400).json({error: 'not valid email or password'});
    }

    const id = uuid();
    ids[id] = login;

    res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.post('/signup', function (req, res) {
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;
    if (
        !email || !login || !password ||
        !email.match(/@/) ||
        !login.match(/^\S{4,}$/) ||
        !password.match(/^\S{4,}$/)

    ) {
        return res.status(400).json({error: 'not valid data'});
    }
    if (users[login]) {
        return res.status(400).json({error: 'user is alredy registred'});
    }

    const id = uuid();
    ids[id] = login;
    users[login] = {password, email, score: 0};


    res.cookie('cookie', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.json({id});
});

app.post('/signout', function (req, res) {
    res.cookie('cookie', null, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json(null);
});

app.post('/game', function (req, res) {
    const id = req.cookies['cookie'];
    const login = ids[id];
    if (!login || !users[login]) {
        return res.status(401).end();
    }

    res.json({id});
    res.status(200);
});