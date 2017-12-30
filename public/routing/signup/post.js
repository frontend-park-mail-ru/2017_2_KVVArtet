exports.postRegistration = (req, res) =>{
    const uuid = require('uuid/v4');
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
    console.log('Я в signup/signin');
};