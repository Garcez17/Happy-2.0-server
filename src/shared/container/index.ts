import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import OrphanagesRepository from '@modules/orphanages/infra/typeorm/repositories/OrphanagesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOrphanagesRepository>(
  'OrphanagesRepository',
  OrphanagesRepository,
);
