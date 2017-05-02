const mongoose = require('mongoose');
const db = require('./init');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  _users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  _contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
  _scripts: [{ type: Schema.Types.ObjectId, ref: 'Script' }]
})

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
