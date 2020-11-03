import { getRepository, Repository } from 'typeorm';

import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import Orphanage from '../entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  public async findById(id: string): Promise<Orphanage | undefined> {
    const orphanage = await this.ormRepository.findOne(id);

    return orphanage;
  }

  public async create(data: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = this.ormRepository.create(data);

    await this.ormRepository.save(orphanage);

    return orphanage;
  }

  public async save(orphanage: Orphanage): Promise<Orphanage> {
    return this.ormRepository.save(orphanage);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default OrphanagesRepository;
