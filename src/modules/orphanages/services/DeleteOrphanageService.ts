import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('orphanage not found.');

    await this.orphanagesRepository.delete(id);
  }
}

export default DeleteOrphanageService;
