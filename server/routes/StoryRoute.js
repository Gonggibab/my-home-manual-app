const express = require("express");
const router = express.Router();
const { StoryModel } = require("../models/StoryModel");

// ================== Story api ====================
// upload story
router.post('/add', (req, res) => {
  const story = new StoryModel(req.body);
  story.save((err, story) => {
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


// delete story
router.post('/delete', (req, res) => {
  StoryModel.deleteOne({ title: req.body.title }, (err, story) => {
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


// update story
router.post('/udpate', (req, res) => {
  StoryModel.updateOne(
    { title: req.body.prevTitle },
    { $set: { title: req.body.title, year: req.body.year } },
    (err, story) => {
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


// get story
router.post('/getByYear', (req, res) => {

  // if request comes with empty body, return all story data
  if (Object.keys(req.body).length === 0) {
    StoryModel.find({}, (err, stories) => {
      if (!stories) {
        return res.json({ success: false, err });
      };
      return res.json({ success: true, stories });
    });
  } else {
    StoryModel.find({ year: { $in: req.body } }, (err, stories) => {
      if (!stories) {
        return res.json({ success: false, err });
      };
      return res.json({ success: true, stories });
    });
  };
});


// search stories
router.post('/search', (req, res) => {
  if (Object.keys(req.body.text).length === 0) {
    StoryModel.find({}, (err, stories) => {
      if (!stories) {
        return res.json({ success: false, err });
      };
      return res.json({ success: true, stories });
    });
  } else {
    StoryModel
      .find({
        $text: { $search: req.body.text }
      },
        (err, stories) => {
          if (!stories) {
            return res.json({ success: false, err });
          };
          return res.json({ success: true, stories });
        });
  };
});


// get one story
router.post('/getOneStory', (req, res) => {
  StoryModel.findOne({ title: req.body.text }, (err, story) => {
    if (!story) {
      return res.json({ success: false, err });
    };
    return res.json({ success: true, story });
  });
});

module.exports = router;