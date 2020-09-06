import AppError from '@shared/errors/AppError';

/* import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider' */
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';


//Variaveis globais
let fakeUsersRepository: FakeUsersRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeUserTokensRepository: FakeUsersTokenRepository;


describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeUserTokensRepository = new FakeUsersTokenRepository();

    fakeUsersRepository;
  });

  it('should be able to recover the password using the email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'jhondoe@exemple.com' });
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'jhondoe@exemple.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould generate forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'jhondoe@exemple.com' });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
