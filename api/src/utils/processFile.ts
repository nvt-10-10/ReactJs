import { BadRequestException } from '@nestjs/common';
import { envPath } from 'src/config';
import { MESSAGE } from 'src/global-constant';
import * as path from 'path';
import * as fs from 'fs';
import * as randomString from 'randomstring';

export class ProcessFile {
  public static customFileName(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|gif)$/)) {
      return cb(new BadRequestException(MESSAGE.UPLOAD.FILE_INVALID));
    }
    if (file.size > 5000000) {
      return cb(new BadRequestException(MESSAGE.UPLOAD.FILE_LIMIT));
    }
    const randomFileName = randomString.generate({
      length: 6,
      charset: 'alphabetic',
    });
    const name = file.originalname.split('.')[0];
    const fileExtension = file.originalname.split('.')[1];
    const newFileName =
      name.split(' ').join('_') +
      '_' +
      randomFileName +
      '_' +
      Date.now() +
      '.' +
      fileExtension;
    cb(null, newFileName);
  }

  public static destinationPath(folderName: string): string {
    return envPath.PUBLIC_PATH + '/uploads/' + folderName;
    // return "./src/resources/public/uploads/" + folderName;
  }

  public static deleteOneFile = async (
    deletePath: string,
  ): Promise<boolean> => {
    if (
      deletePath &&
      deletePath.includes('/') &&
      !deletePath.includes('/default/')
    ) {
      const filePath = path.join(envPath.PUBLIC_PATH, deletePath);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.log('An error occurred while deleting a file', err);
        });
      }
    }
    return true;
  };

  public static deleteManyFile = async (urls: string[]): Promise<boolean> => {
    urls.map((item) => {
      ProcessFile.deleteOneFile(item);
    });
    return true;
  };
}
