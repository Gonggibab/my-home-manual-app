const express = require("express");
const router = express.Router();
const multer = require("multer")
const fs = require('fs')
const { ImageModel } = require("../models/ImageModel");

// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage }).array("file")


// ================== Image api ====================
// upload file
router.post('/uploadFiles', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    };
    return res.json({
      success: true,
      files: res.req.files
    });
  })
});


// upload image to database
router.post('/uploadImages', (req, res) => {
  ImageModel.insertMany(req.body, (err) => {
    if (err) {
      return res.json({
        sucess: false,
        err
      });
    };
    return res.status(200).json({
      success: true
    });
  });
});


// delete image in the server and database
router.post('/deleteImage', (req, res) => {
  fs.unlink(req.body.filepath, (err) => {
    if (err) {
      return res.json({
        sucess: false,
        err
      });
    };

    ImageModel.deleteOne({ filepath: req.body.filepath }, (err) => {
      if (err) {
        return res.json({
          sucess: false,
          err
        });
      };
      return res.status(200).json({
        success: true
      });
    });
  });
});


// delete images by linkTitle in the server and database
router.post('/deleteImages', (req, res) => {
  ImageModel.find({ linkTitle: req.body.title }, (err, images) => {
    if (err) {
      return res.json({
        sucess: false,
        err
      });
    };
    images.map(image => {
      fs.unlink(image.filepath, (err) => {
        if (err) {
          return res.json({
            sucess: false,
            err
          });
        };
      });
    });

    ImageModel.deleteMany({ linkTitle: req.body.title }, (err, images) => {
      if (err) {
        return res.json({
          sucess: false,
          err
        });
      };
      return res.status(200).json({
        success: true
      });
    });
  });
});


// update Images linked title
router.post('/updateLinkTitle', (req, res) => {
  ImageModel.updateMany(
    { linkTitle: req.body.prevTitle },
    { linkTitle: req.body.newTitle },
    (err, images) => {
      if (err) return res.json({ success: false, err });
      return res.json({ success: true, images });
    });
});


// retrive Images with linked title
router.post('/getByTitle', (req, res) => {
  ImageModel.find({ linkTitle: req.body.title }, (err, images) => {
    if (err) return res.json({ success: false, err });
    return res.json({ success: true, images });
  });
});


// get Images with uploader info
router.get('/getWithUserInfo', (req, res) => {
  ImageModel.find()
    .populate('uploader')
    .exec((err, images) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, err });
      }
      return res.json({ success: true, images });
    });
});








module.exports = router;