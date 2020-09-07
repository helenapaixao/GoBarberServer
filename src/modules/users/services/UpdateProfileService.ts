import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const currentUser = await this.usersRepository.findById(user_id);

    if (!currentUser) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== currentUser.id) {
      throw new AppError('E-mail already in use.');
    }

    currentUser.name = name;
    currentUser.email = email;

    if (password && !old_password) {
      throw new AppError(
        'The old password must be provided in order to set a new one.',
      );
    }

    if (password && old_password) {
      const oldPaswordIsCorrect = await this.hashProvider.compareHash(
        old_password,
        currentUser.password,
      );

      if (!oldPaswordIsCorrect) {
        throw new AppError('Old password does not match.');
      }

      currentUser.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(currentUser);
  }
}

export default UpdateProfileService;
