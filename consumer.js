const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  await consumer.connect();
  // It's possible to start from the beginning of the topic
  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
  consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();
