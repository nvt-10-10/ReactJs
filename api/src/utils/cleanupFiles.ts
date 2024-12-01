import { promises as fsPromises } from 'fs';
import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileCleanupService {
  // Phương thức bất đồng bộ để xóa tất cả các tệp
  async cleanupFiles(files: Express.Multer.File[]) {
    // Lặp qua tất cả các tệp trong mảng files và xóa chúng
    for (const file of files) {
      try {
        await fsPromises.unlink(file.path); // Dùng phương thức bất đồng bộ để xóa tệp
        console.log(`Deleted file: ${file.path}`);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }
}
