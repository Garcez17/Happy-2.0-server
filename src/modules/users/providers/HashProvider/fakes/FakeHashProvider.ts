import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(
    payload: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return payload === passwordHashed;
  }
}

export default BCryptHashProvider;
