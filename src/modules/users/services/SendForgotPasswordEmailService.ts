/* import User from '../infra/typeorm/entities/User'; */
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    this.mailProvider.sendEmail(
      email,
      'Pedido de recuperação de senha recebido',
    );

    if (!checkUserExists) {
      throw new AppError('User does not exists');
    }
  }
}

export default SendForgotPasswordEmailService;
