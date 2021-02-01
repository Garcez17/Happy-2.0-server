import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrphanagesRepository from '../repositories/IOrphanagesRepository';
import Orphanage from '../infra/typeorm/entities/Orphanage';

interface IRequest {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
}

@injectable()
class UpdateOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  public async execute({
    id,
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    whatsapp,
    open_on_weekends,
  }: IRequest): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.findById(id);

    if (!orphanage) throw new AppError('Orphanage not found', 404);

    orphanage.name = name;
    orphanage.latitude = latitude;
    orphanage.longitude = longitude;
    orphanage.about = about;
    orphanage.whatsapp = whatsapp;
    orphanage.instructions = instructions;
    orphanage.opening_hours = opening_hours;
    orphanage.open_on_weekends = open_on_weekends;

    await this.orphanagesRepository.save(orphanage);

    return orphanage;
  }
}

export default UpdateOrphanageService;
