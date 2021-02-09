import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('orphanage not found.');

    if (orphanage.images) {
      const images = orphanage.images.map(image => image.path);

      await this.storageProvider.deleteFile(images);
    }
    await this.orphanagesRepository.delete(id);
  }
}

export default DeleteOrphanageService;
