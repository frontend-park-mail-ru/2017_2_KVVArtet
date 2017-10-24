let postRegistration = require( './signup/post');
let postGame =  require ('./game/post');
let post = require('./signin/post');

module.export =  (app) => {
    app.post('/signup', postRegistration);
    app.post('/signin', post);
     app.post('/game', postGame);
};
