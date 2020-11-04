import { v4 } from 'uuid';

import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private orphanages: Orphanage[] = [];

  public async findById(id: string): Promise<Orphanage | undefined> {
    const orphanage = this.orphanages.find(
      findOrphanage => findOrphanage.id === id,
    );

    return orphanage;
  }

  public async findAllOrphanagesVailables(): Promise<Orphanage[]> {
    const orphanages = this.orphanages.filter(
      orphanage => orphanage.available === true,
    );

    return orphanages;
  }

  public async findAllOrphanagesNotVailables(): Promise<Orphanage[]> {
    const orphanages = this.orphanages.filter(
      orphanage => orphanage.available === false,
    );

    return orphanages;
  }

  public async create(data: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = new Orphanage();

    Object.assign(orphanage, { id: v4() }, data);

    this.orphanages.push(orphanage);

    return orphanage;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.orphanages.findIndex(
      findOrphanage => findOrphanage.id === id,
    );

    this.orphanages.splice(findIndex, 1);
  }

  public async save(orphanage: Orphanage): Promise<Orphanage> {
    const findIndex = this.orphanages.findIndex(
      findUser => findUser.id === orphanage.id,
    );

    this.orphanages[findIndex] = orphanage;

    return orphanage;
  }
}

export default OrphanagesRepository;
