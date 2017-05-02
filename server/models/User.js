const mongoose = require('mongoose');
const db = require('./init');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  type: { type: String,
          enum: ["superAdmin", "admin", "staff"],
          default: "staff",
          required: true
        },
  _business: { type: Schema.Types.ObjectId, ref: 'Business' },
  activationToken: String,
  activated: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
