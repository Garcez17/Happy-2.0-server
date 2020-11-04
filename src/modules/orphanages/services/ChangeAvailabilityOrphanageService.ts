import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  id: string;
  available: boolean;
}

@injectable()
class ChangeAvailabilityOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, available }: IRequest): Promise<void> {
    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not found');

    if (available) {
      orphanage.available = available;

      await this.orphanagesRepository.save(orphanage);
      return;
    }

    const images = orphanage.images.map(image => image.path);

    await this.storageProvider.deleteFile(images);

    await this.orphanagesRepository.delete(orphanage.id);
  }
}

export default ChangeAvailabilityOrphanageService;
