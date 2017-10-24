exports.postGame  =  (req, res) =>{
    const id = req.cookies['cookie'];
    const login = ids[id];
    if (!login || !users[login]) {
        return res.status(401).end();
    }

    res.json({id});
    res.status(200);
};