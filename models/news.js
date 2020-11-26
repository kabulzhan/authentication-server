const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  newsHeader: { type: String, required: true },
  newsBody: { type: String, required: true },
  submittedDate: { type: String, required: true },
  approved: { type: Boolean, required: true },
  createdBy: { type: String, required: true },
});

const ModelClass = mongoose.model("news", newsSchema);

module.exports = ModelClass;
