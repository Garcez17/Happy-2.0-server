import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesRouter = Router();
const upload = multer(uploadConfig);

const orphanagesController = new OrphanagesController();

orphanagesRouter.post('/', upload.array('images'), orphanagesController.create);

orphanagesRouter.put(
  '/:id',
  upload.array('images'),
  orphanagesController.update,
);

orphanagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  orphanagesController.delete,
);

export default orphanagesRouter;
