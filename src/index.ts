import express from 'express';

import reviewRoutes from './routes/review.route'
import userRoutes from './routes/user.route'

const app = express();
const PORT = 8081;

app.use(express.json());

app.use('/reviews',reviewRoutes );
app.use('/auth',userRoutes)

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
