import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeappointmentsRespository: FakeAppointmentsRespository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeappointmentsRespository = new FakeAppointmentsRespository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeappointmentsRespository,
    );
  });

  it('should be able to list provider month availability', async () => {
    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 8, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      /*    user_id: '82738', */
      date: new Date(2020, 9, 20, 9, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 10, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 11, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 12, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 13, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 19, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 15, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 16, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 20, 17, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 10,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
