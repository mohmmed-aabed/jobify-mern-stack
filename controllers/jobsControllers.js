import { StatusCodes } from 'http-status-codes';

import Job from '../models/Job.js';
import CustomError from '../errors/custom-error.js';
import checkPermissions from '../utils/checkPermissions.js';

const createJob = async (req, res, next) => {
  try {
    const { position, company } = req.body;
    if (!position || !company) {
      throw new CustomError(
        'Please provide all values!',
        StatusCodes.BAD_REQUEST
      );
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      throw new CustomError(`No job with id: ${jobId}`, StatusCodes.NOT_FOUND);
    }
    checkPermissions(req.user.userId, job.createdBy);
    await job.remove();
    res.status(StatusCodes.OK).json({ msg: 'Job removed successfully!' });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res
      .status(StatusCodes.OK)
      .json({ jobs, totalJobs: jobs.length, numberOfPages: 1 });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const { company, position } = req.body;
    if (!position || !company) {
      throw new CustomError(
        'Please provide all values!',
        StatusCodes.BAD_REQUEST
      );
    }
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      throw new CustomError(`No job with id: ${jobId}`, StatusCodes.NOT_FOUND);
    }
    checkPermissions(req.user.userId, job.createdBy);
    const updatedJob = await Job.findByIdAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.OK).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};

const showStats = async (req, res) => {
  res.send('show stats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
