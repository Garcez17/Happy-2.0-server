import { injectable, inject } from 'tsyringe';

import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute(): Promise<Orphanage[]> {
    const orphanages = await this.orphanagesRepository.findAllOrphanagesVailables();

    return orphanages;
  }
}

export default CreateUserService;
