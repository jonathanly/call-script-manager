const mongoose = require('mongoose');
const db = require('./init');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  mobile: Number,
  group: String
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
