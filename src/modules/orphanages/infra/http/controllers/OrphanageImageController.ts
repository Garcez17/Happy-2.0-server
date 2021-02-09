import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateOrphanageImagesService from '@modules/orphanages/services/UpdateOrphanageImagesService';

class OrphanageImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { oldImages } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const newImages = requestImages.map(image => {
      return { path: image.filename };
    });

    const updateImages = container.resolve(UpdateOrphanageImagesService);

    await updateImages.execute({
      id,
      oldImages,
      newImages,
    });

    return response.status(201).send();
  }
}

export default OrphanageImageController;
