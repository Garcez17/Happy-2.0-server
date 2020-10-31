import AppError from '@shared/errors/AppError';
import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import DeleteOrphanageService from './DeleteOrphanageService';

let deleteOrphanage: DeleteOrphanageService;
let fakeOrphanagesRepository: FakeOrphanagesRepository;

describe('DeleteOrphanage', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();

    deleteOrphanage = new DeleteOrphanageService(fakeOrphanagesRepository);
  });

  it('should be able to delete an orphanage', async () => {
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
    });

    await deleteOrphanage.execute({
      id: orphanage.id,
    });

    expect(deleteFunction).toHaveBeenCalledWith(orphanage.id);
  });

  it('should not be able to delete an orphanage with invalid id', async () => {
    await expect(
      deleteOrphanage.execute({
        id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
