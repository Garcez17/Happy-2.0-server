import AppError from '@shared/errors/AppError';
import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import UpdateOrphanageService from './UpdateOrphanageService';

let updateOrphanage: UpdateOrphanageService;
let fakeOrphanagesRepository: FakeOrphanagesRepository;

describe('DeleteOrphanage', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();

    updateOrphanage = new UpdateOrphanageService(fakeOrphanagesRepository);
  });

  it('should be able to update an orphanage', async () => {
    const orphanage = await fakeOrphanagesRepository.create({
      name: 'Orfanato nova esperança',
      about: 'Sobre',
      instructions: 'Venha sorrindo',
      latitude: '12.341256',
      longitude: '12.323456',
      open_on_weekends: true,
      available: false,
      opening_hours: '06h às 17:00',
      images: [{ path: 'image.png' }, { path: 'image2.jpg' }],
    });

    const newOrphanage = await updateOrphanage.execute({
      id: orphanage.id,
      name: 'New Orphanage',
      about: 'Sobre 2',
      instructions: 'Venham',
      latitude: '12.341256',
      longitude: '12.323456',
      open_on_weekends: false,
      opening_hours: '06h às 17:00',
    });

    expect(newOrphanage.name).toBe('New Orphanage');
  });

  it('should not be able to update an non-existent orphanage', async () => {
    await expect(
      updateOrphanage.execute({
        id: 'non-existent-orphanage',
        name: 'New Orphanage',
        about: 'Sobre 2',
        instructions: 'Venham',
        latitude: '12.341256',
        longitude: '12.323456',
        open_on_weekends: false,
        opening_hours: '06h às 17:00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
