var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

module.exports = router;
