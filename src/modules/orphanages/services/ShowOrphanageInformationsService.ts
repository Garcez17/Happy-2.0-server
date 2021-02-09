import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesImagesRepository from '../repositories/IOrphanagesImagesRepository';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class ShowOrphanageInformationsService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('OrphanagesImagesRepository')
    private orphanagesImagesRepository: IOrphanagesImagesRepository,
  ) {}

  public async execute(id: string): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not Found');

    const images = await this.orphanagesImagesRepository.findByOrphanageId(
      orphanage.id,
    );

    Object.assign(orphanage, { images: classToClass(images) });

    return orphanage;
  }
}

export default ShowOrphanageInformationsService;
