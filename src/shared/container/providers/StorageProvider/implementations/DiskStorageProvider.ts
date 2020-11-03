import fs from 'fs';
import path from 'path';
import uploadsConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(
    files: Array<{
      path: string;
    }>,
  ): Promise<
    Array<{
      path: string;
    }>
  > {
    files.map(async file => {
      await fs.promises.rename(
        path.resolve(uploadsConfig.tmpFolder, file.path),
        path.resolve(uploadsConfig.uploadsFolder, file.path),
      );
    });

    return files;
  }

  public async deleteFile(files: string[]): Promise<void> {
    files.map(async file => {
      const filePath = path.resolve(uploadsConfig.uploadsFolder, file);

      try {
        await fs.promises.stat(filePath);
      } catch {
        return;
      }

      await fs.promises.unlink(filePath);
    });
  }
}

export default DiskStorageProvider;
