import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/custom-error.js';

const checkPermissions = (userId, createdBy) => {
  console.log(userId, createdBy.toString());
  if (userId === createdBy.toString()) {
    return;
  }
  throw new CustomError('Not Authorized!!', StatusCodes.UNAUTHORIZED);
};

export default checkPermissions;
