const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const profile = require('./Profile');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      validate: validator.isEmail,
      unique: [true, 'Email already exists'],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Password is required'],
      select: false,
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (dbPassword, userPassword) {
  return await bcrypt.compare(dbPassword, userPassword);
};

UserSchema.post('save', async function (doc) {
  await Profile.create({ user: doc._id });
});

const User = mongoose.model('User', userSchema);

module.exports = User;