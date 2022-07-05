import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateMiddleware from './middleware/authenticate.js';

const app = express();
dotenv.config();
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());

// ------------------
app.get('/api/v1', (req, res) => {
  res.status(200).json({ msg: 'Hello World!' });
});

// ------------------ routers ------------------
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateMiddleware, jobsRouter);

// ------------------ middleware ------------------
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// ------------------
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
