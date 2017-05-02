const mongoose = require('mongoose');
const db = require('./init')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answer: String,
  _nextQuestion: { type: Schema.Types.ObjectId, ref: 'Question' }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;
