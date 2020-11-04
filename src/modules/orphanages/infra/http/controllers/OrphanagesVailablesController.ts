import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrphanagesVailables from '@modules/orphanages/services/ListOrphanagesVailablesService';

class OrphanagesVailablesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrphanageVailables = container.resolve(ListOrphanagesVailables);

    const orphanages = await listOrphanageVailables.execute();

    return response.json(orphanages);
  }
}

export default OrphanagesVailablesController;
