const express = require('express');
const Script = require('../models/Script');
const Business = require('../models/Business');

const router = express.Router();

// Index: GET all
router.get('/', function(req, res, next) {
  Script.find()
    .then(scripts => {
      res.status(200).json(scripts);
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).json(err);
    });
});

// GET one
router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  Script.findById(id)
    .populate('_startQuestion _answers _questions')
    .then(script => {
      res.status(200).json(script);
    })
    .catch(err => {
      res.status(400).json(error);
    })
});

//create one
router.post('/', function(req, res, next) {
  const { title, businessId } = req.body;

  let newScript = new Script({
    title,
    _business: businessId
  })

  newScript.save()
  .then(script => {
    Business.findByIdAndUpdate(
      businessId,
      { $push: { _scripts: script._id } },
      { new: true }
    )
    .then(business => {
      res.status(200).json({ script, business, message: "Script has been successfully created" });
    })
    .catch(err => {
      res.status(400).json(err);
    })
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

// Delete
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  Script.findByIdAndRemove(id)
    .then(script => {
      res.status(200).json({
        script,
        message: "Script has been successfully deleted"
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//UPDATE
router.patch('/:id', function(req, res, next) {
  const { id } = req.params;

  Script.findByIdAndUpdate(id, req.body, { new:true })
    .then(script => {
      res.status(200).json({
        script,
        message: "Business has been successfully updated"})
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;
