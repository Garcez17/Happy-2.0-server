import Image from '../infra/typeorm/entities/Image';
import Orphanage from '../infra/typeorm/entities/Orphanage';

export default interface IOrphanagesImagesRepository {
  findByOrphanageId(id: string): Promise<Image[]>;
  create(
    files: Array<{
      path: string;
    }>,
    orphanage: Orphanage,
  ): Promise<void>;
  delete(files: string[]): Promise<void>;
}
