const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "kafka-nodejs",
  brokers: ["172.29.112.1:9092"],
});
