const mongoose = require('mongoose');
const db = require('./init');
const Schema = mongoose.Schema;

const scriptSchema = new Schema({
  title: String,
  _business: { type: Schema.Types.ObjectId, ref: 'Business' },
  _startQuestion: { type: Schema.Types.ObjectId, ref: 'Question' },
  _questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  _answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
})

const Script = mongoose.model('Script', scriptSchema)

module.exports = Script;
