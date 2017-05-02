const express = require('express');
const Business = require('../models/Business');

const router = express.Router();

// Index: Get all
router.get('/', function(req, res, next) {
  Business.find()
    .populate('_contacts _users')
    .then(business => {
      res.status(200).json(business);
    })
    .catch( err => {
      console.log('err', err);
      res.status(400).json(err);
    });
});

//get one
router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  Business.findById(id)
    .populate('_contacts _users _scripts')
    .then(business => {
      res.status(200).json(business);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

// Create one
router.post('/', function(req, res, next) {
  const { name } = req.body;

  Business.create({
    name
  })
  .then(business => {
    res.status(200).json({business, message: "Business has been successfully created"});
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Delete
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  Business.findByIdAndRemove(id)
    .then(business => {
      res.status(200).json({ business, message: "this shit business has been successfully deleted"});
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//UPDATE
router.patch('/:id', function(req, res, next) {
  const { id } = req.params;

  Business.findByIdAndUpdate(id, req.body, { new:true })
    .then(business => {
      res.status(200).json({business, message: "Business has been successfully updated"})
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;
