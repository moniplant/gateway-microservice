import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PlantController } from './plant/controller/plant.controller';
import { PlantService } from './plant/service/plant.service';
import {
  PLANTS_CLIENT_ID,
  PLANTS_CONSUMER_GROUP_ID,
  PLANTS_SERVICE,
  SENSORS_CLIENT_ID,
  SENSORS_CONSUMER_GROUP_ID,
  SENSORS_DATA_SERVICE,
  SENSORS_SERVICE,
} from './tokens';
import { SensorController } from './sensor/controller/sensor.controller';
import { SensorService } from './sensor/service/sensor.service';

@Module({
  imports: [
    // Microservice #1: CRUD on plants
    ClientsModule.register([
      {
        name: PLANTS_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: PLANTS_CLIENT_ID,
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: PLANTS_CONSUMER_GROUP_ID,
          },
        },
      },
    ]),
    // Microservice #2: CRUD on sensors
    ClientsModule.register([
      {
        name: SENSORS_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SENSORS_CLIENT_ID,
            brokers: ['kafka:29092'],
          },
          consumer: {
            groupId: SENSORS_CONSUMER_GROUP_ID,
          },
        },
      },
    ]),
    // Microservice #3: Persist sensor data (Humidity, Temperature, Soil Moisture in a NoSQL DB)
    ClientsModule.register([
      {
        name: SENSORS_DATA_SERVICE,
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://mqtt:1883',
        },
      },
    ]),
  ],
  controllers: [PlantController, SensorController],
  providers: [PlantService, SensorService],
})
export class AppModule {}
