import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
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

export default FakeHashProvider;
