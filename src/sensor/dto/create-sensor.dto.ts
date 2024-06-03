import { IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  label: string;
  @IsString()
  plant: string;
  @IsString()
  type: string;
}
