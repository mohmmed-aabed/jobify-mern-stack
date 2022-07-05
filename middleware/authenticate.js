import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import CustomError from '../errors/custom-error.js';

const authenticateMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new CustomError(
        'Authentication Invalid!',
        StatusCodes.UNAUTHORIZED
      );
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId };
      next();
    } catch (error) {
      throw new CustomError(
        'Authentication Invalid!',
        StatusCodes.UNAUTHORIZED
      );
    }
  } catch (error) {
    next(error);
  }
};

export default authenticateMiddleware;
