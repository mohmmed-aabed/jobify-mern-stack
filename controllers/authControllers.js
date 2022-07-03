import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import CustomError from '../errors/custom-error.js';

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // if one field is missing
    if (!name || !email || !password) {
      throw new CustomError(
        'Please provide all values!',
        StatusCodes.BAD_REQUEST
      );
    }
    // if email already exists
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError('Email already exists!', StatusCodes.BAD_REQUEST);
    }
    // create new user
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res
      .status(StatusCodes.CREATED)
      .json({
        user: {
          name: user.name,
          email: user.email,
          lastName: user.lastName,
          location: user.location,
        },
        token,
        location: user.location,
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  res.send('login user');
};

const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
