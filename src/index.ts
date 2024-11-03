import express from 'express';
import { Request, Response } from "express";

import reviewRoutes from './routes/review.route'
import userRoutes from './routes/user.route'
import { authMiddleware } from './middlewares/auth.middleware';
import { RequestWithUser } from './models/user.model';

const app = express();
const PORT = 8081;

app.use(express.json());

app.use('/auth',userRoutes)
app.use('/reviews',authMiddleware,reviewRoutes );

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
