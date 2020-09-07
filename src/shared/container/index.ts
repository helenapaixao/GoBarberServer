import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmetsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

 import IUserTokesRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmetsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

 container.registerSingleton<IUserTokesRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
