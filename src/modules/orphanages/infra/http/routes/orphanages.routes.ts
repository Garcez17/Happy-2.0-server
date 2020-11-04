import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrphanagesController from '../controllers/OrphanagesController';
import OrphanageController from '../controllers/OrphanageController';
import OrphanagesVailablesController from '../controllers/OrphanagesVailablesController';
import OrphanageNotVailablesController from '../controllers/OrphanageNotVailablesController';

const orphanagesRouter = Router();
const upload = multer(uploadConfig);

const orphanagesController = new OrphanagesController();
const orphanageController = new OrphanageController();
const orphanagesVailablesController = new OrphanagesVailablesController();
const orphanageNotVailablesController = new OrphanageNotVailablesController();

orphanagesRouter.get('/vailables', orphanagesVailablesController.index);
orphanagesRouter.get('/not-vailables', orphanageNotVailablesController.index);

orphanagesRouter.post('/', upload.array('images'), orphanagesController.create);

orphanagesRouter.put('/:id', orphanagesController.update);

orphanagesRouter.patch('/:id', orphanageController.update);

orphanagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  orphanagesController.delete,
);

export default orphanagesRouter;
