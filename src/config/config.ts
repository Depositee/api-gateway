import { config } from "dotenv";
config({ path: `.env` });

export const { FRONTEND_URL } = process.env ?? "localhost";
export const { FRONTEND_PORT } = process.env ?? 3000;
export const { DEPOSITING_MANAGEMENT_SERVICE_URL } = process.env ?? "localhost";
export const { DEPOSITING_MANAGEMENT_SERVICE_PORT } = process.env ?? 2999;
export const { PAYMENT_SERVICE_URL } = process.env ?? "localhost";
export const { PAYMENT_SERVICE_PORT } = process.env ?? 3001;
export const { REVIEW_SERVICE_URL } = process.env ?? "localhost";
export const { REVIEW_SERVICE_PORT } = process.env ?? 3002;
export const { USER_SERVICE_URL } = process.env ?? "localhost";
export const { USER_SERVICE_PORT } = process.env ?? 3773;
export const { RABBIT_MQ_URL } = process.env ?? "localhost";
export const { WEBSOCKET_SERVER_PORT } = process.env ?? 8088;
export const { PORT } = process.env ?? 8081;
