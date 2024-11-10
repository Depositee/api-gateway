/* eslint-disable prettier/prettier */
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { PAYMENT_SERVICE_PORT, PAYMENT_SERVICE_URL } from "../config/config";

const PAYMENT_SERVICE_FULL_URL = `${PAYMENT_SERVICE_URL}:${PAYMENT_SERVICE_PORT}`;

const PROTO_PATH = path.join(__dirname, "../../proto/payment.proto");

let paymentClient: any;
let balanceClient: any;

try {
  const paymentDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
  });

  const paymentProto = grpc.loadPackageDefinition(paymentDefinition) as any;
  paymentClient = new paymentProto.PaymentService(
    PAYMENT_SERVICE_FULL_URL,
    grpc.credentials.createInsecure()
  );
  balanceClient = new paymentProto.BalanceService(
    PAYMENT_SERVICE_FULL_URL,
    grpc.credentials.createInsecure()
  );
} catch (error) {
  console.log("Error initializing gRPC client:", error);
}

export { paymentClient, balanceClient };
