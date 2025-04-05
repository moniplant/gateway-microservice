import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PLANTS_SERVICE } from '../../tokens';
import { CreatePlantDto } from '../dto/create-plant.dto';
import {
  CREATE_PLANT,
  LIST_PLANTS,
  LIST_PLANT_TYPES,
  UPDATE_PLANT,
} from 'src/events';
import { CreateorUpdatePlantEvent } from '../events/create-update-plant.event';
import { firstValueFrom } from 'rxjs';
import { UpdatePlantDto } from '../dto/update-plant.dto';

@Injectable()
export class PlantService implements OnModuleInit {
  constructor(
    @Inject(PLANTS_SERVICE) private readonly plantClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.plantClient.subscribeToResponseOf(LIST_PLANTS);
    this.plantClient.subscribeToResponseOf(LIST_PLANT_TYPES);
  }

  async listPlants() {
    return firstValueFrom(this.plantClient.send(LIST_PLANTS, ''));
  }

  async listPlantTypes() {
    return firstValueFrom(this.plantClient.send(LIST_PLANT_TYPES, ''));
  }

  createPlant({
    plant_id,
    plant_name,
    plant_description,
    plant_location,
    plant_type,
    adoption_date,
  }: CreatePlantDto) {
    this.plantClient.emit(
      CREATE_PLANT,
      new CreateorUpdatePlantEvent(
        plant_id,
        plant_name,
        plant_description,
        plant_location,
        plant_type,
        adoption_date,
      ),
    );
  }

  /**
   * Updates an existing sensor.
   * @param sensor_id - The ID of the sensor to be updated.
   * @param updateSensorDto - Data Transfer Object containing the updated sensor details.
   */
  update(
    plant_id: string,
    {
      plant_name,
      plant_description,
      plant_location,
      plant_type,
      adoption_date,
    }: UpdatePlantDto,
  ) {
    this.plantClient.emit(
      UPDATE_PLANT,
      new CreateorUpdatePlantEvent(
        plant_id,
        plant_name,
        plant_description,
        plant_location,
        plant_type,
        adoption_date,
      ),
    );
  }
}
