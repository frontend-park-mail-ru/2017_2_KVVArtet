exports.post =  (req, res) => {
    const uuid = require('uuid/v4');
    const login = req.body.login;
    console.log('Я в signup/signin');

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
    document.cookie = 'sessionid=' + id;
    res.status(201).json({id});
};