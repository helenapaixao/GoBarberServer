import FakeAppointmentsRespository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeappointmentsRespository: FakeAppointmentsRespository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeappointmentsRespository = new FakeAppointmentsRespository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeappointmentsRespository);
  });

  it('should be able to list provider day availability', async () => {
    await fakeappointmentsRespository.create({
      provider_id: 'user',
      user_id:'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeappointmentsRespository.create({
      provider_id: 'user',
       user_id:'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
