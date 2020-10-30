import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import CreateOrphanagesService from './CreateOrphanageService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let createOrphanage: CreateOrphanagesService;

describe('CreateOrphanages', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();

    createOrphanage = new CreateOrphanagesService(fakeOrphanagesRepository);
  });

  it('should be able to create orphanage', async () => {
    const orphanage = await createOrphanage.execute({
      name: 'Orfanato nova esperança',
      about: 'Sobre',
      instructions: 'Venha sorrindo',
      latitude: 12.341256,
      longitude: 12.323456,
      open_on_weekends: true,
      available: false,
      opening_hours: '06h às 17:00',
    });

    console.log(orphanage);

    expect(orphanage).toHaveProperty('id');
  });
});
