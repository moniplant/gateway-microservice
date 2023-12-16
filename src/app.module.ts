import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PlantController } from './plant/controller/plant.controller';
import { PlantService } from './plant/service/plant.service';
import {
  PLANTS_CLIENT_ID,
  PLANTS_CONSUMER_GROUP_ID,
  PLANTS_SERVICE,
} from './tokens';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PLANTS_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: PLANTS_CLIENT_ID,
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: PLANTS_CONSUMER_GROUP_ID,
          },
        },
      },
    ]),
  ],
  controllers: [PlantController],
  providers: [PlantService],
})
export class AppModule {}
