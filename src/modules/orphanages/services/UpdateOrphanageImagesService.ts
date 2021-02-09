import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';
// import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesImagesRepository from '../repositories/IOrphanagesImagesRepository';
// import Image from '../infra/typeorm/entities/Image';

interface IRequest {
  id: string;
  oldImages: string[];
  newImages?: Array<{
    path: string;
  }>;
}

@injectable()
class UpdateOrphanageImagesService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('OrphanagesImagesRepository')
    private orphanagesImagesRepository: IOrphanagesImagesRepository,
  ) {}

  public async execute({ id, oldImages, newImages }: IRequest): Promise<void> {
    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not found', 404);

    const images = await this.orphanagesImagesRepository.findByOrphanageId(
      orphanage.id,
    );

    console.log(oldImages);

    if (oldImages.length === images.length && newImages.length === 0) {
      throw new AppError('No images to update');
    }

    const imagesPaths = images.map(img => img.path);

    const oldImagesPaths = oldImages.map(img => {
      const [, path] = img.split('files/');

      return path;
    });

    const deletedImages = imagesPaths.filter(
      img => !oldImagesPaths.includes(img),
    );

    if (deletedImages.length > 0) {
      await this.storageProvider.deleteFile(deletedImages);
      await this.orphanagesImagesRepository.delete(deletedImages);
    }

    await this.orphanagesImagesRepository.create(newImages, orphanage);
    await this.storageProvider.saveFile(newImages);
  }
}

export default UpdateOrphanageImagesService;
