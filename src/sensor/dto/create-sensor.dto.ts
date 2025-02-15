import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'This is the identifier for the newly created sensor, this should come from the FE (Token created)',
  })
  sensor_id: string;
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'A label can be attributed to each sensor',
  })
  label: string;
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'This is the identifier of the plant to which the sensor is assigned',
  })
  plant_id: string;
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'The type of physical quantity the sensor is measuring (Temperature, Humidty, Moisture...)',
  })
  quantity: string;
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'The type of physical unit the sensor is measuring (K, Degree, Fahrenheit...)',
  })
  unit: string;
}
