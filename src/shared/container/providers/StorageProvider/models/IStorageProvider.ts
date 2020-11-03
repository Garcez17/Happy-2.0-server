export default interface IStorageProvider {
  saveFile(
    files: Array<{
      path: string;
    }>,
  ): Promise<
    Array<{
      path: string;
    }>
  >;
  deleteFile(files: string[]): Promise<void>;
}
