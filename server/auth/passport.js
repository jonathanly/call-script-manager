var express = require('express');
var router = express.Router();
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');


// Passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport + JWT Config
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.TOKEN_SECRET
  },
  function(jwt_payload, done) {
    console.log('jwt_payload: ', jwt_payload);
    console.log('done: ', done);
    User.findById(jwt_payload._id, function(err, user) {
      if (err) {
        console.log('error: ', err);
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }
));

module.exports = passport;
