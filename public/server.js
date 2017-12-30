routing =()=>{ require('./routing')};
const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const app = express();
const morgan = require('morgan');
const fallback = require('express-history-api-fallback');

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(fallback('index.html', { root: 'public' }));

app.use(body.json());
app.use(cookie());
routing(app);
app.use(cors({
    origin: true,
    credentials: true,
}));

/*
app.get('*', (req, res) => {
    res.send('404');
});*/

const port = process.env.PORT || 8000;
app.listen(port, function(){
    console.log(`Server listening port ${port}`);
});

app.delete('/signout',
    (function(req, res) {
        res.cookie('cookie', null, {expires: new Date(Date.now() + 1000 * 60 * 10)});
        res.status(200).json(null);
    }
));


