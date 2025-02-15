import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateSensorDto } from '../dto/create-sensor.dto';
import { UpdateSensorDto } from '../dto/update-sensor.dto';
import { SENSORS_DATA_SERVICE, SENSORS_SERVICE } from 'src/tokens';
import { ClientKafka, ClientMqtt } from '@nestjs/microservices';
import {
  CREATE_SENSOR,
  DELETE_PLANT_SENSORS,
  DELETE_SENSOR,
  LIST_PLANT_SENSORS,
  RETRIEVE_SENSOR,
  SAVE_SENSOR_DATA,
  UPDATE_SENSOR,
} from 'src/events';
import { firstValueFrom } from 'rxjs';
import { SensorDataDto } from '../dto/sensor-data.dto';
import { CreateorUpdateSensorEvent } from '../events/create-update-sensor.event';

/**
 * SensorService is responsible for handling sensor-related operations.
 * It uses Kafka and MQTT clients to communicate with other services.
 */
@Injectable()
export class SensorService implements OnModuleInit {
  /**
   * Constructor for SensorService.
   * @param sensorClient - Kafka client for handling sensor operations.
   * @param sensorDataClient - MQTT client for handling sensor data operations.
   */
  constructor(
    @Inject(SENSORS_SERVICE) private readonly sensorClient: ClientKafka,
    @Inject(SENSORS_DATA_SERVICE) private readonly sensorDataClient: ClientMqtt,
  ) {}

  /**
   * Method that gets called when the module is initialized.
   * Subscribes to the response of the LIST_PLANT_SENSORS and RETRIEVE_SENSOR event.
   */
  onModuleInit() {
    this.sensorClient.subscribeToResponseOf(LIST_PLANT_SENSORS);
    this.sensorClient.subscribeToResponseOf(RETRIEVE_SENSOR);
  }

  /**
   * Creates a new sensor.
   * @param createSensorDto - Data Transfer Object containing sensor creation details.
   */
  create({ sensor_id, label, plant_id, quantity, unit }: CreateSensorDto) {
    this.sensorClient.emit(
      CREATE_SENSOR,
      new CreateorUpdateSensorEvent(sensor_id, label, plant_id, quantity, unit),
    );
  }

  /**
   * Retrieves sensors associated with a specific plant.
   * @param plantId - The ID of the plant whose sensors are to be retrieved.
   * @returns A promise that resolves to the list of sensors.
   */
  findPlantSensors(plantId: string) {
    return firstValueFrom(
      this.sensorClient.send(LIST_PLANT_SENSORS, { id: plantId }),
    );
  }

  /**
   * Retrieves a specific sensor by its ID.
   * @param sensorId - The ID of the sensor to be retrieved.
   * @returns A promise that resolves to the sensor details.
   */
  findOne(sensorId: string) {
    return firstValueFrom(
      this.sensorClient.send(RETRIEVE_SENSOR, { id: sensorId }),
    );
  }

  /**
   * Updates an existing sensor.
   * @param sensor_id - The ID of the sensor to be updated.
   * @param updateSensorDto - Data Transfer Object containing the updated sensor details.
   */
  update(
    sensor_id: string,
    { label, plant_id, quantity, unit }: UpdateSensorDto,
  ) {
    this.sensorClient.emit(
      UPDATE_SENSOR,
      new CreateorUpdateSensorEvent(sensor_id, label, plant_id, quantity, unit),
    );
  }

  /**
   * Removes a specific sensor by its ID.
   * @param sensorId - The ID of the sensor to be removed.
   */
  remove(sensorId: string) {
    this.sensorClient.emit(DELETE_SENSOR, { id: sensorId });
  }

  /**
   * Removes all sensors associated with a specific plant.
   * @param plantId - The ID of the plant whose sensors are to be removed.
   */
  removePlantSensors(plantId: string) {
    this.sensorClient.emit(DELETE_PLANT_SENSORS, { id: plantId });
  }

  saveSensorEntry(entry: SensorDataDto) {
    Logger.log('Send  via MQTT ', entry);
    this.sensorDataClient.emit(SAVE_SENSOR_DATA, entry);
  }
}
