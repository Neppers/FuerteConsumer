var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET all other pages */
router.get(/(.*)$/, function(req, res, next) {
    var options = {
        host: '127.0.0.1',
        port: 3000,
        path: 'api/content/' + req.params[0],
        method: 'GET'
    };

    var buffer = '';
    
    var request = http.get('http://127.0.0.1:3000/api/content' + req.params[0], function(response) {
        response.on('data', function(c) {
            buffer += c;
        });
        response.on('end', function(err) {
            res.render('content', {
                content: JSON.parse(buffer)
            });
        });
    });

});

module.exports = router;
