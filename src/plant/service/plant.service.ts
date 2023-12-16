import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PLANTS_SERVICE } from '../../tokens';
import { CreatePlantRequest } from '../dto/create-plant.dto';
import { CREATE_PLANT } from 'src/events';
import { CreatePlantEvent } from '../events/create-plant.event';

@Injectable()
export class PlantService {
  constructor(
    @Inject(PLANTS_SERVICE) private readonly plantClient: ClientKafka,
  ) {}

  createPlant({plantName, plantDescription, plantLocation, adoptionDate}: CreatePlantRequest) {
    this.plantClient.emit(CREATE_PLANT, new CreatePlantEvent(plantName, plantDescription, plantLocation, adoptionDate));
  }

}
