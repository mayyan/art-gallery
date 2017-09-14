var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data', 'images.data.js');
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

/* GET image listing. */
router.get('/images', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    fs.readFile(dataFilePath, 'utf8', (err, content) => {
        if (err) {
            return res.status(500).send({msg: err});;
        }
        
        res.status(200).send(content);
    });
});

/* Add new image. */
router.post('/images', fileUpload(), function(req, res, next) {

    if (!req.files) {
        return res.status(400).send({msg: 'No files were uploaded.'});
    }

    console.log(req.files.inputFile); // the uploaded file object
    // The name of the input field (i.e. "inputFile") is used to retrieve the uploaded file
    let inputFile = req.files.inputFile;

    // Use the mv() method to place the file somewhere on your server
    let fileDest = path.join(__dirname, '..', 'src', 'images_orig', req.files.inputFile.name);
    inputFile.mv(fileDest, function(err) {
        if (err) {
            return res.status(500).send({msg: err});
        }

        // to prevent override, change file permission to read-only.
        // so that when a same filename came in, .mv will report error.
        fs.chmod(fileDest, '444');

        // Write to data file
        fs.readFile(dataFilePath, 'utf8', (err, content) => {
            if (err) {
                throw err;
            }
            console.log(content);
            let imagesData = JSON.parse(content);
            imagesData.push({
                key: req.files.inputFile.name,
                imagePath: '/images_orig/' + req.files.inputFile.name,
                imageDate: req.body.imageDate,
                imageCategory: req.body.imageCategory
            });
            let contentNew = JSON.stringify(imagesData, null, 4);
            fs.writeFile(dataFilePath, contentNew, 'utf8', function (err) {
                if (err) {
                    return res.status(500).send({msg: err});
                }
                return res.send({msg: 'File uploaded!'});
            }); 
        });
    });
});

/* Delete an image */
router.delete('/images/:key', basicAuth(basicAuthOption), function(req, res, next) {
    var key = req.params.key;

    res.setHeader('Content-Type', 'application/json');

    var needToDelete = function(item) {
        return item.key == key; 
    }

    fs.readFile(dataFilePath, 'utf8', (err, content) => {
        if (err) {
            throw err;
        }
        let imagesData = JSON.parse(content);
        let indexToBeDeleted = imagesData.findIndex(needToDelete)
        let itemToBeDeleted = imagesData.splice(indexToBeDeleted, 1); // imagesData is updated too
        let imagePath = '';
        if (itemToBeDeleted.length > 0) {
            imagePath = path.join(__dirname, '..', 'src', itemToBeDeleted[0].imagePath);

            /* delete the image file */
            fs.unlink(imagePath, function(err) {
                if (err) {
                    throw err;
                }
                // update data file
                let contentNew = JSON.stringify(imagesData, null, 4);
                fs.writeFile(dataFilePath, contentNew, 'utf8', function (err) {
                    if (err) {
                        throw err;
                    }
                    return res.status(200).send(contentNew);
                }); 
            });
        } else {
            return res.status(404).send({msg: 'Image not found!'});
        }
    });
});

router.put('/images/:key', basicAuth(basicAuthOption), function(req, res, next) {
    var key = req.params.key;

    res.setHeader('Content-Type', 'application/json');

    var needToEdit = function(item) {
        return item.key == key; 
    }

    fs.readFile(dataFilePath, 'utf8', (err, content) => {
        if (err) {
            throw err;
        }
        let imagesData = JSON.parse(content);
        let indexToBeEdited = imagesData.findIndex(needToEdit)

        if (indexToBeEdited >= 0) {
            // update imagesData 
            imagesData[indexToBeEdited] = req.body; 

            // update data file
            let contentNew = JSON.stringify(imagesData, null, 4);
            fs.writeFile(dataFilePath, contentNew, 'utf8', function (err) {
                if (err) {
                    throw err;
                }
                return res.status(200).send(contentNew);
            });
        } else {
            return res.status(404).send({msg: 'Image not found!'});
        }
    });
});

module.exports = router;
