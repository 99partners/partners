const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, default: "Draft" },
  date: { type: String, required: true },
  photo: { type: String },
  tag: { type: String },
  category: { type: String },
});

module.exports = mongoose.model("Blog", BlogSchema);
