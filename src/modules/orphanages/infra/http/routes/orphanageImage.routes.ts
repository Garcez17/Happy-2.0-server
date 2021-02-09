import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrphanageImageController from '../controllers/OrphanageImageController';

const orphanageImageRouter = Router();
const upload = multer(uploadConfig.multer);

const orphanageImagesController = new OrphanageImageController();

orphanageImageRouter.patch(
  '/:id',
  upload.array('newImages'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  orphanageImagesController.update,
);

export default orphanageImageRouter;
