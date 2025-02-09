import { UpdatePlantDto } from '../dto/update-plant.dto';
import { CreatePlantDto } from '../dto/create-plant.dto';
import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { PlantService } from '../service/plant.service';

@Controller('plant')
@ApiTags('Plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  /**
   * Retrieves a list of all plants.
   * @returns A list of plants.
   */
  @Get('/plants')
  @ApiOperation({ summary: 'Retrieve a list of all plants.' })
  listPlants() {
    return this.plantService.listPlants();
  }

  /**
   * Retrieves a list of plant types.
   * @returns A list of plant types.
   */
  @Get('/plant_types')
  @ApiOperation({ summary: 'Retrieve a list of plant types.' })
  listPlantTypes() {
    return this.plantService.listPlantTypes();
  }

  /**
   * Updates an existing plant.
   * @param id - The ID of the plant to be updated.
   * @param updateSensorDto - Data Transfer Object containing the updated plant details.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing plant.' })
  @ApiParam({ name: 'id', description: 'The ID of the plant to update.' })
  @ApiBody({
    type: UpdatePlantDto,
    description: 'The updated details of the plant.',
  })
  update(@Param('id') id: string, @Body() updateSensorDto: UpdatePlantDto) {
    this.plantService.update(id, updateSensorDto);
  }

  /**
   * Creates a new plant.
   * @param createPlantDto - Data Transfer Object containing the plant details to be created.
   * @returns The created plant.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new plant.' })
  @ApiBody({
    type: CreatePlantDto,
    description: 'Details of the plant to be created.',
  })
  createPlant(@Body(new ValidationPipe()) createPlantDto: CreatePlantDto) {
    this.plantService.createPlant(createPlantDto);
  }
}
