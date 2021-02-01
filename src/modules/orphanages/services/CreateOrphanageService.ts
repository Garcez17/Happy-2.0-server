import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';

import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  available: boolean;
  images: Array<{
    path: string;
  }>;
}

@injectable()
class CreateOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(data: IRequest): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.create(data);

    await this.storageProvider.saveFile(orphanage.images);

    return orphanage;
  }
}

export default CreateOrphanageService;
