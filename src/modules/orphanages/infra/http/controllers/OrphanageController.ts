import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangeAvailabilityOrphanageService from '@modules/orphanages/services/ChangeAvailabilityOrphanageService';

class OrphanagesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { available } = request.body;

    const ChangeAvailabilityOrphanage = container.resolve(
      ChangeAvailabilityOrphanageService,
    );

    await ChangeAvailabilityOrphanage.execute({
      id,
      available,
    });

    return response.json({ message: 'Operation completed' });
  }
}

export default OrphanagesController;
