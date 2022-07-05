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
    res.status(StatusCodes.CREATED).json({
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError(
        'Please provide all values!',
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new CustomError('Invalid credentials!', StatusCodes.UNAUTHORIZED);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError('Invalid credentials!', StatusCodes.UNAUTHORIZED);
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
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

const updateUser = async (req, res, next) => {
  try {
    const { name, email, lastName, location } = req.body;
    if (!name || !email || !lastName || !location) {
      throw new CustomError(
        'Please provide all values!',
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;
    await user.save();
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
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

export { register, login, updateUser };
