import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import CreateOrphanagesService from './CreateOrphanageService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createOrphanage: CreateOrphanagesService;

describe('CreateOrphanages', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createOrphanage = new CreateOrphanagesService(
      fakeOrphanagesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create orphanage', async () => {
    const orphanage = await createOrphanage.execute({
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

    expect(orphanage).toHaveProperty('id');
    expect(orphanage.images[0].path).toBe('image.png');
  });
});
