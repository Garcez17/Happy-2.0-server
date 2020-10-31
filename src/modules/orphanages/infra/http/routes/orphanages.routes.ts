import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();

const orphanagesController = new OrphanagesController();

orphanagesRouter.post('/', orphanagesController.create);
orphanagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  orphanagesController.delete,
);

export default orphanagesRouter;
