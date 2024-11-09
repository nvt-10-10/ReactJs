import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          let destPath: string;
          if (file.mimetype.startsWith('image/')) {
            destPath = join(
              process.cwd(),
              'src',
              'public',
              'uploads',
              'images',
            );
          } else if (file.mimetype.startsWith('video/')) {
            destPath = join(
              process.cwd(),
              'src',
              'public',
              'uploads',
              'videos',
            );
          } else {
            destPath = join(
              process.cwd(),
              'src',
              'public',
              'uploads',
              'documents',
            );
          }

          console.log({ destPath });

          // Tạo thư mục nếu chưa có
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }

          callback(null, destPath); // Chỉ cần chỉ định thư mục lưu tệp, Multer sẽ lưu tệp vào đây
        },

        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const baseFilename = `${Date.now()}`;
          const filename = `${baseFilename}${ext}`; // Đặt tên tệp

          console.log({ filename, __dirname, cwd: process.cwd() });

          callback(null, filename); // Chỉ cần tên tệp, Multer sẽ tự động kết hợp với thư mục lưu

          // Xử lý tệp ảnh ngay sau khi đã lưu
          if (file.mimetype.startsWith('image/')) {
            const destPath = join(
              process.cwd(),
              'src',
              'public',
              'uploads',
              'images',
              filename,
            );
            sharp(destPath)
              .webp()
              .toFile(destPath.replace(ext, '.webp'))
              .then(() => fs.unlinkSync(destPath)) // Xóa tệp gốc nếu chuyển đổi thành công
              .catch((error) =>
                console.error('Error processing image:', error),
              );
          }
        },
      }),

      limits: {
        fileSize: Math.max(5 * 1024 * 1024, 20 * 1024 * 1024, 10 * 1024 * 1024),
      },
    };
  }
}
