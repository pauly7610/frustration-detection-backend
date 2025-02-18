import { Kafka, Producer, Consumer } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'frustration-detection-backend',
  brokers: (process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092').split(',')
});

export const createProducer = async (): Promise<Producer> => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

export const createConsumer = async (groupId: string): Promise<Consumer> => {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return consumer;
}; 