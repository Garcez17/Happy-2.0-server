import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: Array<{
    path: string;
  }> = [];

  public async saveFile(
    files: Array<{
      path: string;
    }>,
  ): Promise<
    Array<{
      path: string;
    }>
  > {
    files.forEach(file => {
      this.storage.push(file);
    });

    return files;
  }

  public async deleteFile(files: string[]): Promise<void> {
    files.forEach(file => {
      const findIndex = this.storage.findIndex(
        storageFile => storageFile.path === file,
      );

      this.storage.splice(findIndex, 1);
    });
  }
}

export default FakeStorageProvider;
