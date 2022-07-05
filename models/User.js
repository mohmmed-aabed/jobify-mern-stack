import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name!'],
    minLength: 3,
    maxLength: 18,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email!'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email!',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password!'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxLength: 18,
    trim: true,
    default: 'lastName',
  },
  location: {
    type: String,
    maxLength: 18,
    trim: true,
    default: 'myCity',
  },
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model('User', userSchema);

export default User;
