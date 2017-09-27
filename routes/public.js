'use strict';

const fs = require('fs');
const path = require('path');

function publication (req,res){
    const extens = path.extname(req.url);
    let contentType  =  '';

    switch (extens) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/js';
            break;
        case '.png':
            contentType = 'text/png';
            break;
        case '.jpg':
            contentType = 'text/jpg';
            break;
        default:
            contentType = 'text/plain';
    }
    res.statusCode = 200;
    res.setHeader('Content-Type',contentType);

    const stream = fs.createReadStream(path.join(__dirname,'..','public',req.url));

    stream.pipe(res);
    stream.on('error',error => {
        if (error.code === ' ENOENT'){
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.end('Not Found');
        }
        else {
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end(error.message);
        }
    });
}
module.exports = publication;
