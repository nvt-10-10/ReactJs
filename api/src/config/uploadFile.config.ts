import { diskStorage } from 'multer';
import { extname } from 'path';

const MAX_SIZE_IMAGE = 5 * 1024 * 1024; // 5MB
const MAX_SIZE_VIDEO = 20 * 1024 * 1024; // 20MB

export const multerImageConfig = {
  storage: diskStorage({
    destination: './uploads/images', // Thư mục lưu trữ hình ảnh
    filename: (req, file, callback) => {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      callback(null, filename);
    },
  }),
  limits: {
    fileSize: MAX_SIZE_IMAGE,
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/^image\//)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid image file type'), false);
    }
  },
};

export const multerVideoConfig = {
  storage: diskStorage({
    destination: './uploads/videos', // Thư mục lưu trữ video
    filename: (req, file, callback) => {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      callback(null, filename);
    },
  }),
  limits: {
    fileSize: MAX_SIZE_VIDEO, // Giới hạn kích thước tệp tin
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/^video\//)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid video file type'), false);
    }
  },
};
