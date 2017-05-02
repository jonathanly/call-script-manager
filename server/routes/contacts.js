const express = require('express');
const Contact = require('../models/Contact');
const Business = require('../models/Business');
const router = express.Router();

// Index: GET all
router.get('/', function(req, res, next) {
  Contact.find()
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).json(err);
    });
});

// GET one
router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  Contact.findById(id)
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(err => {
      res.status(400).json(error);
    })
});

//create one
router.post('/', function(req, res, next) {
  const { firstName, lastName, email, phone, mobile, group, business } = req.body; // rename business => businessId?
   let newContact = new Contact({
    firstName,
    lastName,
    email,
    phone,
    mobile,
    group
  })

  newContact.save()
  .then(contact => {
    Business.findByIdAndUpdate(
      business,
      { $push: { _contacts: contact._id } },
      { new: true }
    )
    .then(business => {
      console.log(business)
      res.status(200).json({ contact, business, message: "Contact has been successfully created" });
    })
    .catch(err => {
      res.status(400).json(err);
    })
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// DELETE
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  Contact.findByIdAndRemove(id)
    .then(contact => {

      res.status(200).json({ contact, message: "Contact has successfully been deleted"});
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// UPDATE
router.patch('/:id', function(req, res, next) {
  const { id } = req.params;

  Contact.findByIdAndUpdate(id, req.body, { new: true })
    .then(contact => {
      res.status(200).json({ contact, message: "Contact has been successfully updated" })
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;
