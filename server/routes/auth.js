const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Business = require('../models/Business')
const jwt = require('jsonwebtoken');
const emailService = require('../auth/authService');
const router = express.Router();

const isAuthorisedUser = passport.authenticate('jwt', { failWithError: true, session: false });

function whitelistUser({ email, firstName, lastName, _id, type, _business, activated }) {
  return { email, firstName, lastName, _id, type, _business, activated };
}

function generateToken(user) {
  return jwt.sign(
    whitelistUser(user),
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  );
}

// Sign In
router.post('/signin',
  passport.authenticate('local', { failWithError: true }),
  function(req, res) {
    console.log(req.user);
    const token = generateToken(req.user);
    res.json({ token });
  })

// Sign Up
router.post('/register', function(req, res, next) {
  console.log(req.body)
  const { email, password, firstName, lastName, type, businessName, businessAddress } = req.body;

  let activationToken = emailService.generateActivationToken();

  console.log('Registering User');
  Business.create({
    name: businessName,
    address: businessAddress
  })
  .then(business => {
    User.register(
      new User({
        email,
        firstName,
        lastName,
        type,
        activationToken,
        _business: business._id
      }),
      password,
      function(err, user) {
        if (err) {
          return next(err);
        }

        // Add newly created user to business
        Business.findByIdAndUpdate(
          business._id,
          { $push: { _users: user._id } },
          { new: true }
        )
        .then(updatedBusiness => {
          console.log(updatedBusiness)
        })
        .catch(err => {
          console.log(err)  // needs proper error handling
        })

        // Send account activation email
        const token = generateToken(user);
        emailService.sendActivationEmail(user)
        res.status(200).json({
          "message": "An account activation link has been sent to your email",
          token
        })
      });
  })
  .catch(err => {
    console.log(err);
  })
});

//Activation    //token for user logging in when a new user is created and activated a token is generated
router.post('/activate/:token', function(req, res) {
  const token = req.params.token
  if (!token) res.status(400).json({ error: 'Invalid token' }); //error is no token
  var user = User.findOne({
    activationToken: token
  }).then(function(user, err) {
    console.log(err, user)
    //if user is not activated at the time of the token being generated the user will be
    if (user != undefined && user.activated == false) {
      user.update ({
        activated: true,
        activationToken: null,
      }, function(err, user) {
      console.log(err, user)
      User.findOne({
        _id: user._id,
      }).then(function(user, err) {
        console.log('updated user', user)
      })

      })
      user = user //attributes plus salt and hashed pw values
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(400).json({error: 'Invalid token'})
    }
  })
})


// Get
// router.get('/', isAuthorisedUser, function(req, res) {
//   const { user } = req;
//
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(401).json({ message: 'Please sign in' });
//   }
// });

//FOR DEV PURPOSURRR
router.get('/', function(req, res, next) {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Delete
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(user => {
      res.status(200).json({ user, message: "User has successfully been deleted"});
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//creating new staff
router.post('/staff', function(req, res, next) {
  console.log(req.body)
  const { email, password, firstName, lastName, type, businessId } = req.body;

  let activationToken = emailService.generateActivationToken();

  User.register(
    new User({
      email,
      firstName,
      lastName,
      type,
      activationToken,
      _business: businessId
    }),
    password,
    function(err, user) {
      if (err) {
        return next(err);
      }

      //Add newly created staff to business
      Business.findByIdAndUpdate(
        businessId,
        { $push: { _users: user._id } },
        { new: true }
      )
      .then(updatedBusiness => {
        console.log(updatedBusiness)
      })
      .catch(err => {
        res.status(400).json(err);
      })

      //sending staff activation email
      const token = generateToken(user);
      emailService.sendActivationEmail(user)
      res.status(200).json({
        "message": "An account activation link has been sent to the staff member's email",
        user
      })
  })
});

module.exports = router;
