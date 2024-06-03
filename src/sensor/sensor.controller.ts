import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { SensorDataDto } from './dto/sensor-data.dto';

/**
 * SensorController handles HTTP requests related to sensors.
 */
@Controller('sensor')
export class SensorController {
  /**
   * Constructor for SensorController.
   * @param sensorService - Service handling sensor operations.
   */
  constructor(private readonly sensorService: SensorService) {}

  /**
   * Creates a new sensor.
   * @param createSensorDto - Data Transfer Object containing sensor creation details.
   */
  @Post('')
  create(@Body() createSensorDto: CreateSensorDto) {
    this.sensorService.create(createSensorDto);
  }

  /**
   * Retrieves sensors associated with a specific plant.
   * @param plantId - The ID of the plant whose sensors are to be retrieved.
   * @returns A promise that resolves to the list of sensors.
   */
  @Get(':plantId')
  findPlantSensors(@Param('plantId') id: string) {
    return this.sensorService.findPlantSensors(id);
  }

  /**
   * Retrieves a specific sensor by its ID.
   * @param id - The ID of the sensor to be retrieved.
   * @returns A promise that resolves to the sensor details.
   */
  @Get(':id')
  findSensor(@Param('id') id: string) {
    return this.sensorService.findOne(id);
  }

  /**
   * Updates an existing sensor.
   * @param id - The ID of the sensor to be updated.
   * @param updateSensorDto - Data Transfer Object containing the updated sensor details.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    this.sensorService.update(id, updateSensorDto);
  }

  /**
   * Removes a specific sensor by its ID.
   * @param id - The ID of the sensor to be removed.
   */
  @Delete(':id')
  removeSensor(@Param('id') id: string) {
    this.sensorService.remove(id);
  }

  /**
   * Removes all sensors associated with a specific plant.
   * @param plantId - The ID of the plant whose sensors are to be removed.
   */
  @Delete(':plantId')
  removeAllPlantSensors(@Param('plantId') id: string) {
    this.sensorService.removePlantSensors(id);
  }

  @Post('sensorData')
  saveSensorData(@Body() dataEntry: SensorDataDto) {
    this.sensorService.saveSensorEntry(dataEntry);
  }
}
