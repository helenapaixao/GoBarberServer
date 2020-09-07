/* import User from '../infra/typeorm/entities/User'; */
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokesRepository from '../repositories/IUserTokensRepository';

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

    @inject('UserTokensRepository')
    private userTokesRepository: IUserTokesRepository,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    this.mailProvider.sendEmail(
      email,
      'Pedido de recuperação de senha recebido',
    );

    if (!user) {
      throw new AppError('User does not exists');
    }
   const {token} = await this.userTokesRepository.generate(user.id);
    await this.mailProvider.sendEmail(
      email,
      `Pedido de recuperação de senha recebido:${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
