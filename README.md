# Steps:

### Classic way

 - To run the gateway service, it is crucial that the Kafka broker is connected, run `docker compose up` on the path to kafdrop `kafdrop\docker-compose\kafka-kafdrop`.
 - Run `npm run start:dev`
 - To consult Swagger for testing the API, go under: `localhost:3000/api`

### Docker

Made easy with docker compose, run: `docker compose up` for running all services at once.
- kafdrop UI for monitoring all Kafka events under port: 9000
- kafka server running under: 9092
- gateway service running under port: 3000
- swagger UI for testing the API: `http://localhost:3000/api`