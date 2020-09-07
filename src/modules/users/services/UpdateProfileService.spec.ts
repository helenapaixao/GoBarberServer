import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let usersRepository: FakeUsersRespository;
let hashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRespository();
    hashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(usersRepository, hashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

     const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@email.com',
    });

    expect(updateUser.name).toBe('John Tre');
    expect(updateUser?.email).toBe('johntre@email.com');
  });

  it('should not be able to update profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'fake-name',
        email: 'fake-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to change to another user's email", async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const johnTre = await usersRepository.create({
      name: 'John Tre',
      email: 'johnTre@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: johnTre.id,
        name: 'John Tre',
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@email.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to set a new password without providing the old one', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to set a new password if the old one is wrong', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
