import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not Found');

    return user;
  }
}

export default ShowUserService;
