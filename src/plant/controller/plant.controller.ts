import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PlantService } from '../service/plant.service';
import { CreatePlantRequest } from '../dto/create-plant.dto';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}
  
  @Post()
  createPlant(@Body(new ValidationPipe()) createPlantDto: CreatePlantRequest) {
    this.plantService.createPlant(createPlantDto);
  }
} 
