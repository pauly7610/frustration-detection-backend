import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'frustration-detection',
  brokers: [process.env.KAFKA_BROKER!],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'frustration-group' });

export const connectKafka = async () => {
  await producer.connect();
  await consumer.connect();
  console.log('Kafka connected');
}; 