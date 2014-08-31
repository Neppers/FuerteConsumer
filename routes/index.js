var express = require('express');
var http = require('http');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/index');
});

/* GET all pages */
router.get(/(.*)$/, function(req, res, next) {

    var options = {
        host: '127.0.0.1',
        port: 3000,
        path: 'api/content' + req.params[0],
        method: 'GET'
    };

    var buffer = '';
    
    var request = http.get('http://127.0.0.1:3000/api/content' + req.params[0], function(response) {
        response.on('data', function(c) {
            buffer += c;
        });
        response.on('end', function(err) {
            var content = JSON.parse(buffer);
            if (content.status === 404) {
                return next(new Error(404));
            } else {
                res.render(content.template, {
                    content: content
                });
            }
        });
    });
});

module.exports = router;
