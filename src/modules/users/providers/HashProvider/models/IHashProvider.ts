export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, passwordHashed: string): Promise<boolean>;
}
