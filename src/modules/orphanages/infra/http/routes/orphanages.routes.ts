import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

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
orphanagesRouter.get(
  '/not-vailables',
  ensureAuthenticated,
  orphanageNotVailablesController.index,
);
orphanagesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orphanagesController.show,
);

orphanagesRouter.post(
  '/',
  upload.array('images'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      about: Joi.string().required(),
      instructions: Joi.string().required(),
      opening_hours: Joi.string().required(),
      open_on_weekends: Joi.boolean().required(),
    },
  }),
  orphanagesController.create,
);

orphanagesRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      about: Joi.string().required(),
      instructions: Joi.string().required(),
      opening_hours: Joi.string().required(),
      open_on_weekends: Joi.boolean().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orphanagesController.update,
);

orphanagesRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      available: Joi.boolean().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orphanageController.update,
);

orphanagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  orphanagesController.delete,
);

export default orphanagesRouter;
