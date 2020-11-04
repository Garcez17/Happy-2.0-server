import { injectable, inject } from 'tsyringe';

import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class ListOrphanagesNotVailablesService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute(): Promise<Orphanage[]> {
    const orphanages = await this.orphanagesRepository.findAllOrphanagesNotVailables();

    return orphanages;
  }
}

export default ListOrphanagesNotVailablesService;
