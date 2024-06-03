import { IsString } from 'class-validator';

export class SensorDataDto {
  @IsString()
  plant_id: string;
  @IsString()
  sensor_id: string;
  @IsString()
  timestamp: string;
  @IsString()
  value: string;
}
