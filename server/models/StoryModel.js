const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
  title: {
    type: String,
    unique: 1,
  },
  year: {
    type: String,
  },
});


// create indexes for the fields to search
storySchema.index({ title: 'text', year: 'text' });


const StoryModel = mongoose.model('Story', storySchema);
module.exports = { StoryModel };