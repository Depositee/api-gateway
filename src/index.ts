import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.route";
import paymentRotes from "./routes/payment.route";
import reviewRoutes from "./routes/review.route";
import userRoutes from "./routes/user.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { FRONTEND_URL, FRONTEND_PORT } from "./config/config";

const app = express();
const PORT = 8081;
const FRONTEND_FULL_URL = `${FRONTEND_URL}:${FRONTEND_PORT}`;

app.use(
  cors({
    origin: FRONTEND_FULL_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.use('/auth',userRoutes)
app.use('/order',orderRoutes)
app.use('/reviews',authMiddleware,reviewRoutes );
app.use("/payment", authMiddleware, paymentRotes);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
