import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from "./image.service";
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imageService: ImageService,
  ) {}

  @Get(':fileKey')
  async getImage(@Param('fileKey') fileKey: string, @Res() res: Response) {
    console.log("fileKey", fileKey)
    const imageData = await this.imageService.getImageFromKintone(fileKey);
    console.log("imageData", imageData)
    res.setHeader('Content-Type', 'image/jpeg'); // Or whatever the correct type is
    res.send(imageData);
  }
}