import mongoose from 'mongoose';
import validator from 'validator';

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

const User = mongoose.model('User', userSchema);

export default User;
