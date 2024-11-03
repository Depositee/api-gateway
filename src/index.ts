import express from 'express';

import orderRoutes from './routes/order.route'
import reviewRoutes from './routes/review.route'
import userRoutes from './routes/user.route'
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();
const PORT = 8081;

app.use(express.json());

app.use('/auth',userRoutes)
app.use('/order',authMiddleware,orderRoutes)
app.use('/reviews',authMiddleware,reviewRoutes );

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
