import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let usersRepository: FakeUsersRespository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRespository();
    showProfile = new ShowProfileService(usersRepository);
  });

  it('should be able to show the profile', async () => {
     const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

     const profile = await showProfile.execute({
      user_id: user.id,

    });

    expect(profile.name).toBe('John Doe');
    expect(profile?.email).toBe('johndoe@email.com');
  });


});
