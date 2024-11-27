import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageService } from '../service/image.service';

@Controller('api/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/uploads/images/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    console.log({ path: `public/uploads/images/${imageName}` });

    const imageStream = this.imageService.getImage(
      `public/uploads/images/${imageName}`,
    );

    imageStream.pipe(res);
  }
}
