var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

router.use(fileUpload());

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    console.log(req.files.inputFile); // the uploaded file object
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "inputFile") is used to retrieve the uploaded file
    let inputFile = req.files.inputFile;

    // Use the mv() method to place the file somewhere on your server
    let fileDest = path.join(__dirname, '..', 'src', 'images_orig', req.files.inputFile.name);
    inputFile.mv(fileDest, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        // to prevent override, change file permission to read-only.
        // so that when a same filename came in, .mv will report error.
        fs.chmod(fileDest, '444');

        // Write to data file
        let imagesData = require("../src/data/images.data.js");
        imagesData.push({
            imagePath: '/images_orig/' + req.files.inputFile.name,
            imageDate: req.body.imageDate,
            imageCategory: req.body.imageCategory
        });
        let content = `'use strict';
module.exports = ` + JSON.stringify(imagesData, null, 4) + ";";
        let dataFileDest = path.join(__dirname, '..', 'src', 'data', "images.data.js");
        fs.writeFile(dataFileDest, content, 'utf8', function (err) {
            if (err) {
                return res.status(500).send(err);
            }
        }); 

        // res.send('File uploaded!');
        
    });
});

module.exports = router;
