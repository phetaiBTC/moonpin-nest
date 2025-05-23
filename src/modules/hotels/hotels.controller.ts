import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { storage } from '@/utils/storage.util';
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createHotelDto: CreateHotelDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.hotelsService.create(createHotelDto, file);
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', { storage }))
  // uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: any,
  //   @Req() req: Request,
  // ) {
  //   const baseUrl = `${req.protocol}://${req.get('host')}`;
  //   return {
  //     url: `${baseUrl}/assets/${file.filename}`,
  //     data: body,
  //   };
  // }

}
