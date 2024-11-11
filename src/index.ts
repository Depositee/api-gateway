import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.route";
import paymentRotes from "./routes/payment.route";
import reviewRoutes from "./routes/review.route";
import userRoutes from "./routes/user.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { FRONTEND_URL, FRONTEND_PORT } from "./config/config";
import { createServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { createWebSocketConnection,UserConsumers, UserSockets } from "./messageBrokers/webSocket";

const app = express();
const PORT = 8081;
const FRONTEND_FULL_HTTP_URL = `http://${FRONTEND_URL}:${FRONTEND_PORT}`;
const FRONTEND_FULL_HTTPS_URL = `https://${FRONTEND_URL}:${FRONTEND_PORT}`;
const FRONTEND_FULL_HTTP_URL_NOT_PORT = `http://${FRONTEND_URL}`;
const FRONTEND_FULL_HTTPS_URL_NOT_PORT = `https://${FRONTEND_URL}`;

app.use(
  cors({
    origin: [
      FRONTEND_FULL_HTTP_URL,
      FRONTEND_FULL_HTTPS_URL,
      FRONTEND_FULL_HTTP_URL_NOT_PORT,
      FRONTEND_FULL_HTTPS_URL_NOT_PORT,
      "http://localhost:3000",
      "https://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/order", orderRoutes);
app.use("/reviews", authMiddleware, reviewRoutes);
app.use("/payment", authMiddleware, paymentRotes);

const server = createServer(app);

const wss = new WebSocketServer({ server });
const userConsumers: UserConsumers = {}; 
const userSockets : UserSockets = {};

wss.on("connection", (ws: WebSocket, req) => {
  const userId = new URL(
    req.url!,
    `http://${req.headers.host}`
  ).searchParams.get("userId");

  if (!userId) {
    console.error("Missing userId in query parameters.");
    ws.close();
    return;
  }
  createWebSocketConnection(ws,userId,userSockets,userConsumers);
});


server.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
