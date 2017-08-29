var express = require('express');
var router = express.Router();
var basicAuth = require('express-basic-auth');

router.use('/', basicAuth({
    users: {
        'admin': '0bscur1ty'
    },
    challenge: true,
    realm: 'Administrator'
}));

router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

module.exports = router;
