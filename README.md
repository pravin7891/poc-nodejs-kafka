
# KAFKA with Nodejs Overview

- This project uses Node.js and Apache Kafka. The README below covers installing Node.js, running Kafka via Docker Desktop, and running the application components in multiple terminal windows.

## Prerequisites

- Docker Desktop (with Docker Engine running)
- Node.js (LTS recommended)
- npm (comes with Node.js)
- Git (optional, to clone repository)

## 1. Install Node.js

- Download and install Node.js from the official site (LTS recommended).
- Verify installation:
  - node --version
  - npm --version

## 2. Install project dependencies

- From the project root:
  - npm install

## 3. Run Kafka on Docker Desktop

```javascript
   docker run -p 9092:9092 -p 29093:29093 ^
   -e CLUSTER_ID=AAAAAAAAAAAAAAAAAAAAAQ ^
   -e KAFKA_NODE_ID=1 ^
   -e KAFKA_PROCESS_ROLES=broker,controller ^
   -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:29093 ^
   -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>>:9092 ^
   -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER ^
   -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:29093 ^
   -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 ^
   -e KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1 ^
   -e KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1 ^
   confluentinc/cp-kafka:7.6.1
```

## 4. Verify Kafka is running

- Check containers:
  - docker ps
- Optionally use kafka-tools or a client script to produce/consume a test message.

## 5. Configure application (if applicable)

- Update Kafka connection settings in your app (e.g., bootstrap servers) to point to localhost:9092 (or the address configured above).
- Example environment variables:
  - KAFKA_BOOTSTRAP_SERVERS=localhost:9092

## 6. Run application in multiple terminal windows (CMD / PowerShell / Terminal)

- Typical pattern: run producer in one window, consumer in another.
- Add convenient npm scripts to package.json (example):

```javascript
  "scripts": {
  "start:admin": "node admin.js",
  "start:consumer": "node consumer.js group1",
  "start:producer": "node producer.js",
  }
```

- Open multiple terminals and run:

  - Terminal 1: npm run start:admin
  - Terminal 2: npm run start:producer
  - Terminal 3: npm run start:consumer group1
  - Terminal 4: npm run start:consumer group1

  - To produce message, go to producer terminal and provide input. example
    ```javascript
    > Sam north
    > Kim south
    ```
  - Observe logged messages on multiple consumer terminals

## 7. Stop services

- Ctrl + c to stop running instances of kafka admin, producers and consumers.
- Stop running kafka from Docker Desktop -> Container
