let postRegistration = require( './signup/post');
let post = require('./signin/post');

module.export =  (app) => {
    app.post('/signup', postRegistration);
    app.post('/signin', post);
};
