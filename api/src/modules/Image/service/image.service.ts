import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageService {
  private readonly imageBasePath: string;

  constructor(private configService: ConfigService) {
    this.imageBasePath =
      this.configService.get<string>('IMAGE_BASE_PATH') ||
      join(process.cwd(), 'uploads', 'images');
  }

  getImage(imagePath: string): NodeJS.ReadableStream {
    const relativePath = imagePath.replace(/^\/uploads\/images\//, '');
    const fullPath = join(this.imageBasePath, relativePath);
    try {
      return createReadStream(fullPath);
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }
}
