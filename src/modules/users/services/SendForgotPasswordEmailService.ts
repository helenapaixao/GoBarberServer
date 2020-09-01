/* import User from '../infra/typeorm/entities/User'; */
import { injectable, inject } from 'tsyringe';

/* import AppError from '@shared/errors/AppError'; */
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({}: IRequest): Promise<void> {}
}

export default SendForgotPasswordEmailService;
