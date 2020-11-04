import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import ChangeAvailabilityOrphanageService from './ChangeAvailabilityOrphanageService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let changeAvailabilityOrphanage: ChangeAvailabilityOrphanageService;

describe('CreateOrphanages', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    changeAvailabilityOrphanage = new ChangeAvailabilityOrphanageService(
      fakeOrphanagesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to change availability to true', async () => {
    const deleteFunction = jest.spyOn(fakeOrphanagesRepository, 'delete');

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

    await changeAvailabilityOrphanage.execute({
      id: orphanage.id,
      available: true,
    });

    expect(orphanage.available).toBe(true);
    expect(deleteFunction).toHaveBeenCalledTimes(0);
  });

  it('should be able to change availability to false and delete orphanage', async () => {
    const deleteFunction = jest.spyOn(fakeOrphanagesRepository, 'delete');

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

    await changeAvailabilityOrphanage.execute({
      id: orphanage.id,
      available: false,
    });

    expect(deleteFunction).toHaveBeenCalledWith(orphanage.id);
  });

  it('should not be able to change availability if orphanage dosent exists', async () => {
    await expect(
      changeAvailabilityOrphanage.execute({
        id: 'invalid-id',
        available: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
