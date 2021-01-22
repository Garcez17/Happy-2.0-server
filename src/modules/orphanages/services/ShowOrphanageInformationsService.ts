import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class ShowOrphanageInformationsService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute(id: string): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not Found');

    return orphanage;
  }
}

export default ShowOrphanageInformationsService;
