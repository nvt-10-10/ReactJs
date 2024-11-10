import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageService {
  private readonly imageBasePath: string;

  constructor(private configService: ConfigService) {
    this.imageBasePath =
      this.configService.get<string>('IMAGE_BASE_PATH') ||
      join(process.cwd(), 'src');
  }

  getImage(imagePath: string): NodeJS.ReadableStream {
    const relativePath = imagePath.replace(/^\/uploads\/images\//, '');
    const fullPath = join(this.imageBasePath, relativePath);
    console.log({ fullPath, path: this.imageBasePath, relativePath });
    // Check if the file exists
    if (!existsSync(fullPath)) {
      throw new NotFoundException('Image not found');
    }

    try {
      return createReadStream(fullPath);
    } catch (error) {
      console.log('loi');
      throw new NotFoundException('Image not found');
    }
  }
}
