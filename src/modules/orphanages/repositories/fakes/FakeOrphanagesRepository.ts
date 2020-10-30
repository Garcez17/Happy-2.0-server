import { v4 } from 'uuid';

import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private orphanages: Orphanage[] = [];

  public async create(data: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = new Orphanage();

    Object.assign(orphanage, { id: v4() }, data);

    this.orphanages.push(orphanage);

    return orphanage;
  }
}

export default OrphanagesRepository;
