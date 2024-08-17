import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PlantService } from '../service/plant.service';
import { CreatePlantDto } from '../dto/create-plant.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('plant')
@ApiTags('Plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Get('/plants')
  listPlants() {
    return this.plantService.listPlants();
  }

  @Get('/plant_types')
  listPlantTypes() {
    return this.plantService.listPlantTypes();
  }

  @Post()
  createPlant(@Body(new ValidationPipe()) createPlantDto: CreatePlantDto) {
    this.plantService.createPlant(createPlantDto);
  }
}
