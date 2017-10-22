
routing =()=>{ require('./routing')};
const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(body.json());
app.use(cookie());
routing(app);
app.use(cors({
    origin: true,
    credentials: true,
}));


app.get('*', (req, res) => {
    res.send('404');
});

const port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Server listening port ${port}`);
});

app.post('/signout',
    (req, res) => {
        res.cookie('cookie', null, {expires: new Date(Date.now() + 1000 * 60 * 10)});
        res.status(200).json(null);
    }
);

