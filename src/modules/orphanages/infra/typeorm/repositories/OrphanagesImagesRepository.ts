import { getRepository, Repository } from 'typeorm';

import IOrphanagesImagesRepository from '@modules/orphanages/repositories/IOrphanagesImagesRepository';
import Image from '../entities/Image';
import Orphanage from '../entities/Orphanage';

class OrphanagesImagesRepository implements IOrphanagesImagesRepository {
  private ormRepository: Repository<Image>;

  constructor() {
    this.ormRepository = getRepository(Image);
  }

  public async create(path: string, orphanage: Orphanage): Promise<Image> {
    const image = this.ormRepository.create({
      orphanage,
      path,
    });

    await this.ormRepository.save(image);

    return image;
  }

  public async delete(file: string): Promise<string> {
    const fileId = await this.ormRepository.findOne({
      where: { path: file },
    });

    await this.ormRepository.delete(fileId.id);

    return 'apagou!';
  }
}

export default OrphanagesImagesRepository;
