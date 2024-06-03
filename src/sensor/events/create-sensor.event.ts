import { OmitType } from '@nestjs/swagger';
import { UpdateSensorEvent } from './update-sensor.event';

/**
 * This event will be sent through Kafka messaging to the Sensor API, a create event is just an update without an id
 */
export class CreateSensorEvent extends OmitType(UpdateSensorEvent, [
  'id',
] as const) {}
