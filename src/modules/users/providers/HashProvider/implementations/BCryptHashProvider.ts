import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(
    payload: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return compare(payload, passwordHashed);
  }
}

export default BCryptHashProvider;
