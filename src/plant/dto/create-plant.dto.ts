import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  plantName: string;
  @IsString()
  plantDescription: string;
  @IsString()
  plantLocation: string;
  @Type(() => Date)
  @IsDate()
  adoptionDate: Date;
}
