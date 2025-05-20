import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Request } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) { }
  @Get('search')
  async search(@Query('name') name: string) {
    const amenity = await this.amenitiesService.findByName(name);
    if (!amenity) {
      throw new NotFoundException('Amenity not found');
    }
    return amenity;
  }
  @Post()
  create(@Body() createAmenityDto: CreateAmenityDto, @Request() req) {
    return this.amenitiesService.create(createAmenityDto, req.user.hotel);
  }

  @Get()
  findAll(@Request() req) {
    return this.amenitiesService.findAll(req.user.hotel);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amenitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmenityDto: UpdateAmenityDto) {
    return this.amenitiesService.update(+id, updateAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amenitiesService.remove(+id);
  }


}

