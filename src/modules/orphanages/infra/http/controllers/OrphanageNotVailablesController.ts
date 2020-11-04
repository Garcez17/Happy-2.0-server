import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrphanagesNotVailables from '@modules/orphanages/services/ListOrphanagesNotVailablesService';

class OrphanagesNotVailablesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrphanageNotVailables = container.resolve(
      ListOrphanagesNotVailables,
    );

    const orphanages = await listOrphanageNotVailables.execute();

    return response.json(orphanages);
  }
}

export default OrphanagesNotVailablesController;
