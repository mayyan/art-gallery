var express = require('express');
var router = express.Router();
var basicAuth = require('express-basic-auth');
const basicAuthOption = {
    users: {
        'admin': '0bscur1ty'
    },
    challenge: true,
    realm: 'Administrator',
    unauthorizedResponse: function(req) {
        return {msg: 'not authorized'}
    }
}

router.get('/', basicAuth(basicAuthOption), function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

module.exports = router;
