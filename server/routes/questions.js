const express = require('express');
const Question = require('../models/Question');
const Script = require('../models/Script');

const router = express.Router();

// GET
router.get('/', function(req, res, next) {
  Question.find()
  .populate('_answers')
  .then(questions => {
    res.status(200).json(questions);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

// GET ONE
router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  Question.findById(id)
  .populate('_answers')
  .then(question => {
    res.status(200).json(question);
  })
  .catch(error => {
    res.status(400).json(error);
  })
});

// CREATE
router.post('/', function(req, res, next) {
  const { question, scriptId } = req.body;

  Question.create({
    question
  })
  .then(question => {
    Script.findByIdAndUpdate(
      scriptId,
      { $push: { _questions: question._id } },
      { new: true }
    )
    .then(script => {
      res.status(200).json({ question, script, message: "Starting question has been successfully added" });
    })
    .catch(err => {
      res.status(400).json(err);
    })
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// CREATE startQuestion
router.post('/start', function(req, res, next) {
  const { startQuestion, scriptId } = req.body;

  let newQuestion = new Question({
    question: startQuestion,
  })

  newQuestion.save()
  .then(question => {
    Script.findByIdAndUpdate(
      scriptId,
      { $push: { _questions: question._id },
        _startQuestion: question._id },
      { new: true }
    )
    .then(script => {
      res.status(200).json({ question, script, message: "Starting question has been successfully added" });
    })
    .catch(err => {
      res.status(400).json(err);
    })
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// DELETE question
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  Question.findByIdAndRemove(id)
    .then(question => {
      res.status(200).json({ question, message: "Question has been successfully deleted" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// UPDATE
// router.patch('/:id', function(req, res, next) {
//   const { id } = req.params;
//
//   Question.findByIdAndUpdate(id, req.body, { new: true })
//     .then(question => {
//       res.status(200).json({question, message: "Question has been successfully updated"})
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     })
// });

module.exports = router;
