import { getRepository, Repository } from 'typeorm';

import IOrphanagesImagesRepository from '@modules/orphanages/repositories/IOrphanagesImagesRepository';
import Image from '../entities/Image';
import Orphanage from '../entities/Orphanage';

class OrphanagesImagesRepository implements IOrphanagesImagesRepository {
  private ormRepository: Repository<Image>;

  constructor() {
    this.ormRepository = getRepository(Image);
  }

  public async findByOrphanageId(id: string): Promise<Image[]> {
    const image = await this.ormRepository.find({
      where: { orphanage: id },
    });

    return image;
  }

  public async create(
    files: Array<{
      path: string;
    }>,
    orphanage: Orphanage,
  ): Promise<void> {
    files.forEach(async file => {
      const image = this.ormRepository.create({
        orphanage,
        path: file.path,
      });

      return this.ormRepository.save(image);
    });
  }

  public async delete(files: string[]): Promise<void> {
    files.forEach(async file => {
      const fileId = await this.ormRepository.findOne({
        where: { path: file },
      });

      await this.ormRepository.delete(fileId.id);

      return 'apagou!';
    });
  }
}

export default OrphanagesImagesRepository;
