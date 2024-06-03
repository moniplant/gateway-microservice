import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PLANTS_SERVICE } from '../../tokens';
import { CreatePlantDto } from '../dto/create-plant.dto';
import { CREATE_PLANT, LIST_PLANTS } from 'src/events';
import { CreatePlantEvent } from '../events/create-plant.event';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PlantService implements OnModuleInit {
  constructor(
    @Inject(PLANTS_SERVICE) private readonly plantClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.plantClient.subscribeToResponseOf(LIST_PLANTS);
  }

  async listPlants() {
    return firstValueFrom(this.plantClient.send(LIST_PLANTS, ''));
  }

  async createPlant({
    plantName,
    plantDescription,
    plantLocation,
    adoptionDate,
  }: CreatePlantDto) {
    this.plantClient.emit(
      CREATE_PLANT,
      new CreatePlantEvent(
        plantName,
        plantDescription,
        plantLocation,
        adoptionDate,
      ),
    );
  }
}
