import Image from '../infra/typeorm/entities/Image';
import Orphanage from '../infra/typeorm/entities/Orphanage';

export default interface IOrphanagesImagesRepository {
  create(path: string, orphanage: Orphanage): Promise<Image>;
  delete(id: string): Promise<string>;
}
