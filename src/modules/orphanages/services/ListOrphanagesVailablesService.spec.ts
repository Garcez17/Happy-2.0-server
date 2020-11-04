import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import ListOrphanagesVailablesService from './ListOrphanagesVailablesService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let listOrphanagesVailables: ListOrphanagesVailablesService;

describe('ListOrphanagesVailables', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();

    listOrphanagesVailables = new ListOrphanagesVailablesService(
      fakeOrphanagesRepository,
    );
  });

  it('should be able to list orphanages vailables', async () => {
    await fakeOrphanagesRepository.create({
      name: 'Orfanato nova esperança 1',
      about: 'Sobre',
      instructions: 'Venha sorrindo',
      latitude: '12.341256',
      longitude: '12.323456',
      open_on_weekends: true,
      available: false,
      opening_hours: '06h às 17:00',
      images: [{ path: 'image.png' }, { path: 'image2.jpg' }],
    });

    const orphanage2 = await fakeOrphanagesRepository.create({
      name: 'Orfanato nova esperança 2',
      about: 'Sobre',
      instructions: 'Venha sorrindo',
      latitude: '12.341256',
      longitude: '12.323456',
      open_on_weekends: true,
      available: true,
      opening_hours: '06h às 17:00',
      images: [{ path: 'image.png' }, { path: 'image2.jpg' }],
    });

    const orphanage3 = await fakeOrphanagesRepository.create({
      name: 'Orfanato nova esperança 3',
      about: 'Sobre',
      instructions: 'Venha sorrindo',
      latitude: '12.341256',
      longitude: '12.323456',
      open_on_weekends: true,
      available: true,
      opening_hours: '06h às 17:00',
      images: [{ path: 'image.png' }, { path: 'image2.jpg' }],
    });

    const orphanages = await listOrphanagesVailables.execute();

    expect(orphanages).toEqual([orphanage2, orphanage3]);
  });
});
