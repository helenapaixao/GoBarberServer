import { container } from 'tsyringe';


import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebarMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
