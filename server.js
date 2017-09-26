'use strict';

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
   // res.send('404');
    res.redirect('/error.html')

});

app.listen(process.env.PORT || '8080', () => {
    console.log('Hello fucking world !');
});