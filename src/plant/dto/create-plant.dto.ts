import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'This is the identifier for the newly created plant, this should come from the FE (Token created)',
  })
  plant_id: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the plant to be created.',
  })
  plant_name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'A brief description of the plant.',
  })
  plant_description: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'The location of the plant.',
  })
  plant_location: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'The type of the plant.',
  })
  plant_type: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'The date the plant was adopted.',
  })
  adoption_date: Date;
}
