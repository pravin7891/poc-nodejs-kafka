const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "kafka-nodejs",
  brokers: ["<PRIVATE_IP>:9092"],
});
