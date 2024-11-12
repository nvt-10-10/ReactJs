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

          callback(null, destPath); // Chỉ định thư mục lưu tệp
        },

        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const baseFilename = `${Date.now()}`;
          const filename = `${baseFilename}${ext}`;

          console.log({ filename, __dirname, cwd: process.cwd(), file });

          callback(null, filename); // Multer lưu tệp với tên này

          // Bắt đầu xử lý ảnh ngay sau khi tệp đã được lưu
          if (file.mimetype.startsWith('image/')) {
            const savedFilePath = join(
              process.cwd(),
              'src',
              'public',
              'uploads',
              'images',
              filename,
            );

            // Sử dụng sharp để xử lý ảnh sau khi tệp được lưu
            // Chờ đến khi tệp được lưu xong
            setTimeout(async () => {
              try {
                if (fs.existsSync(savedFilePath)) {
                  console.log('ton tai file');
                }
                await sharp(savedFilePath)
                  .webp()
                  .toFile(savedFilePath.replace(extname(filename), '.webp'));

                // Xóa tệp gốc sau khi chuyển đổi thành công
                // fs.unlinkSync(savedFilePath);
                console.log(
                  'Ảnh đã được chuyển đổi sang WebP và tệp gốc đã bị xóa.',
                );
              } catch (error) {
                console.error('Lỗi khi chuyển đổi ảnh:', error);
              }
            }, 100); // Chờ 500ms
          }
        },
      }),

      limits: {
        fileSize: Math.max(5 * 1024 * 1024, 20 * 1024 * 1024, 10 * 1024 * 1024),
      },
    };
  }
}
