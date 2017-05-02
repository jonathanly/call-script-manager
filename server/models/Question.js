const mongoose = require('mongoose');
const db = require('./init');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  _answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;
