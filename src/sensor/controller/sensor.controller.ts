import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SensorService } from '../service/sensor.service';
import { CreateSensorDto } from '../dto/create-sensor.dto';
import { UpdateSensorDto } from '../dto/update-sensor.dto';
import { SensorDataDto } from '../dto/sensor-data.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * SensorController handles HTTP requests related to sensors.
 */
@Controller('sensor')
@ApiTags('Sensor')
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
  @ApiOperation({ summary: 'Create new sensor and associate it to a plant.' })
  create(@Body() createSensorDto: CreateSensorDto) {
    this.sensorService.create(createSensorDto);
  }

  /**
   * Retrieves sensors associated with a specific plant.
   * @param plantId - The ID of the plant whose sensors are to be retrieved.
   * @returns A promise that resolves to the list of sensors.
   */
  @Get('/sensors/:plantId')
  @ApiOperation({
    summary: 'Retrieves sensors associated with a specific plant.',
  })
  findPlantSensors(@Param('plantId') id: string) {
    return this.sensorService.findPlantSensors(id);
  }

  /**
   * Retrieves a specific sensor by its ID.
   * @param id - The ID of the sensor to be retrieved.
   * @returns A promise that resolves to the sensor details.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a specific sensor by its ID.',
  })
  findSensor(@Param('id') id: string) {
    return this.sensorService.findOne(id);
  }

  /**
   * Updates an existing sensor.
   * @param id - The ID of the sensor to be updated.
   * @param updateSensorDto - Data Transfer Object containing the updated sensor details.
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Updates an existing sensor.',
  })
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    this.sensorService.update(id, updateSensorDto);
  }

  /**
   * Removes a specific sensor by its ID.
   * @param id - The ID of the sensor to be removed.
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Removes a specific sensor by its ID.',
  })
  removeSensor(@Param('id') id: string) {
    this.sensorService.remove(id);
  }

  /**
   * Removes all sensors associated with a specific plant.
   * @param plantId - The ID of the plant whose sensors are to be removed.
   */
  @Delete(':plantId')
  @ApiOperation({
    summary: 'Removes all sensors associated with a specific plant.',
  })
  removeAllPlantSensors(@Param('plantId') id: string) {
    this.sensorService.removePlantSensors(id);
  }

  /**
   * Delegates the saving of sensor data to the sensor service. And then to the Sensor microservice.
   * @param dataEntry - Data Transfer Object containing the sensor data to be saved.
   */
  @Post('sensorData')
  @ApiOperation({
    summary:
      'Delegates the saving of sensor data to the Sensor microservice. It uses MQTT Protocol for that.',
  })
  saveSensorData(@Body() dataEntry: SensorDataDto) {
    this.sensorService.saveSensorEntry(dataEntry);
  }

  /**
   * Retrieves from the Sensor microservice the latest sensor data for a specific plant and sensor.
   * @param plantId - The ID of the plant whose sensor data is to be retrieved.
   * @param sensorId - The ID of the sensor whose data is to be retrieved.
   * @returns A promise that resolves to the latest sensor data.
   */
  @Get('sensordata/:plantId/:sensorId')
  @ApiOperation({
    summary:
      'Retrieves the latest sensor data for a specific plant and sensor.',
  })
  getLatestSensorData(
    @Param('plantId') plantId: string,
    @Param('sensorId') sensorId: string,
  ) {
    return this.sensorService.getLatestSensorData(plantId, sensorId);
  }
}
