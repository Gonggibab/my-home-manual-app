const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = mongoose.Schema({
  filename: {
    type: String,
    unique: 1,
  },
  filepath: {
    type: String,
  },
  linkTitle: {
    type: String,
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mimetype: {
    type: String,
  },
  originalname: {
    type: String,
  },
  size: {
    type: String,
  },
}, { timestamps: true });


const ImageModel = mongoose.model('Image', imageSchema);
module.exports = { ImageModel };