import { injectable, inject } from 'tsyringe';

import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO';
import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute(data: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.create(data);

    return orphanage;
  }
}

export default CreateUserService;
