import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrphanageService from '@modules/orphanages/services/CreateOrphanageService';
import DeleteOrphanageService from '@modules/orphanages/services/DeleteOrphanageService';

class OrphanagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      available = false,
    } = request.body;

    const createOrphanage = container.resolve(CreateOrphanageService);

    const orphanage = await createOrphanage.execute({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      available,
    });

    return response.json(orphanage);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrphanage = container.resolve(DeleteOrphanageService);

    await deleteOrphanage.execute({ id });

    return response.json({ message: 'Orphanage deleted.' });
  }
}

export default OrphanagesController;
