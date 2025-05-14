import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SensorDataDto {
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'This is the identifier for the plant emitting the sensor data',
  })
  plant_id: string;
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is the identifier for the specific sensor emitting data',
  })
  sensor_id: string;
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Timestamp when the data has been taken',
  })
  ts: string;
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Measured value emitted by the sensor',
  })
  value: string;
}
