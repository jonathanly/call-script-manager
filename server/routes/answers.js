const express = require('express');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Script = require('../models/Script');

const router = express.Router();

// GET
router.get('/', function(req, res, next) {
  Answer.find()
  .populate('_nextQuestion')
  .then(answers => {
    res.status(200).json(answers);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

// GET ONE
router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  Answer.findById(id)
  .then(answer => {
    res.status(200).json(answer);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

// CREATE
router.post('/', function(req, res, next) {
  const { parentQuestionId, answerValue, nextQuestionId, scriptId } = req.body;

  let newAnswer = new Answer({
    answer: answerValue,
    _nextQuestion: nextQuestionId
  })

  newAnswer.save()
  .then(answer => {

    Question.findByIdAndUpdate(
      parentQuestionId,
      { $push: { _answers: answer._id } },
      { new: true }
    )
    .then(question => { // Might not need this promise segment
      console.log('Question: ', question)
    })
    .catch(err => {
      res.status(401).json(err)
    });

    Script.findByIdAndUpdate(
      scriptId,
      { $push: { _answers: answer._id } },
      { new: true }
    )
    .then(script => {
      console.log('script: ', script)
      res.status(200).json({ answer, script, message: "Answer has been successfully saved" }) // Sending everything back for now
    })
    .catch(err => {
      console.log(err)
      res.status(402).json(err)
    });

  })
  .catch(err => {
    res.status(403).json(err);
  });
});

// DELETE answer
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  Answer.findByIdAndRemove(id)
    .then(answer => {
      res.status(200).json({ message: "Answer has been successfully deleted", answer });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// UPDATE

router.patch('/:id', function(req, res, next) {
  const { id } = req.params;
  const { answer, _nextQuestion } = req.body;

  Answer.findByIdAndUpdate(
    id,
    { answer: req.body.answer,
      question: req.body.question },
    { new: true }
    )
    .then(answer => {
      res.status(200).json({ message: "Answer has been successfully updated", answer })
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;

// Using callbacks
// newAnswer.save((err, answer) => {
//   if (err)
//     res.status(400).json(err);
//
//   Question.findByIdAndUpdate(
//     parentQuestionId,
//     { $push: { _answers: answer._id } },
//     { new: true }
//   )
//   .then(question => {
//     res.status(200).json(question);
//   })
//   .catch(err => {
//     res.status(400).json(err)
//   })
// })
