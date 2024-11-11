import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { WebSocket, WebSocketServer } from "ws";
import { RABBIT_MQ_URL } from "../config/config";

const RABBITMQ_URL = `amqp://${RABBIT_MQ_URL}`;
const EXCHANGE = "notification_exchange";

const wss = new WebSocketServer({ port: 8088 });

export interface UserConsumers {
  [userId: string]: { channel: Channel };
}

export interface UserSockets {
  [userId: string]: WebSocket;
}

export const startRabbitMQConsumer = async (
  userId: string,
  channel: Channel,
  userSockets : UserSockets
): Promise<void> => {
  try {
    await channel.assertExchange(EXCHANGE, "topic", { durable: true });

    const queue = `user.${userId}.notification`;
    await channel.assertQueue(queue, { durable: true });

    const routingKey = `user.${userId}.notification`;
    await channel.bindQueue(queue, EXCHANGE, routingKey);

    console.log(`Waiting for messages for user ${userId}...`);

    channel.consume(queue, async(msg: ConsumeMessage | null) => {
      if (msg) {
        const messageContent = msg.content.toString();
        await new Promise(resolve => setTimeout(resolve, 200));
        if (
          userSockets[userId] &&
          userSockets[userId].readyState === WebSocket.OPEN
        ) {
          userSockets[userId].send(messageContent);
        }

        channel.ack(msg);
        console.log(
          `Received message for user ${userId}:`,
          JSON.parse(messageContent)
        );
      }
    });

    console.log("RabbitMQ Consumer is listening for messages...");
  } catch (error) {
    console.error("Error starting RabbitMQ Consumer:", error);
  }
};

export const stopRabbitMQConsumer = async (userId: string , userConsumers : UserConsumers): Promise<void> => {
  const consumer = userConsumers[userId];
  if (consumer) {
    try {
      await consumer.channel.close();
      console.log(`Stopped RabbitMQ consumer for user ${userId}`);
      delete userConsumers[userId]; 
    } catch (error) {
      console.error("Error stopping RabbitMQ Consumer:", error);
    }
  }
};


export const createWebSocketConnection = (ws: WebSocket , userId : string , userSockets: UserSockets , userConsumers : UserConsumers ) => {
    try {
        console.log(`Client connected with userId: ${userId}`);
        userSockets[userId] = ws;
    
        if (userConsumers[userId]) {
          stopRabbitMQConsumer(userId , userConsumers); 
        }
    
        amqp
          .connect(RABBITMQ_URL)
          .then((connection: Connection) => {
            return connection.createChannel().then((channel: Channel) => {
              userConsumers[userId] = { channel }; 
              startRabbitMQConsumer(userId, channel,userSockets); 
            });
          })
          .catch((error) => {
            console.error("Error connecting to RabbitMQ:", error);
            ws.close();
          });
    
        ws.on("close", () => {
          console.log(`Client disconnected for userId: ${userId}`);
    
          delete userSockets[userId];
          stopRabbitMQConsumer(userId,userConsumers);
        });
      } catch (error) {
        console.error("Authentication failed:", error);
        ws.close();
      }
}
