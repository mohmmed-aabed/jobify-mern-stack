import { StatusCodes } from 'http-status-codes';

import Job from '../models/Job.js';
import CustomError from '../errors/custom-error.js';

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

const deleteJob = async (req, res) => {
  res.send('delete job');
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

const updateJob = async (req, res) => {
  res.send('update job');
};

const showStats = async (req, res) => {
  res.send('show stats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
