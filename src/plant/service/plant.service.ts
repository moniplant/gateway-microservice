import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PLANTS_SERVICE } from '../../tokens';
import { CreatePlantRequest } from '../dto/create-plant.dto';
import { CREATE_PLANT } from 'src/events';
import { CreatePlantEvent } from '../events/create-plant.event';
import { Logger } from '@nestjs/common';

@Injectable()
export class PlantService {
  constructor(
    @Inject(PLANTS_SERVICE) private readonly plantClient: ClientKafka,
  ) {}

  async createPlant({plantName, plantDescription, plantLocation, adoptionDate}: CreatePlantRequest) {
    Logger.log('Emitting something');
    this.plantClient.emit(CREATE_PLANT, new CreatePlantEvent(plantName, plantDescription, plantLocation, adoptionDate));
  }

}
