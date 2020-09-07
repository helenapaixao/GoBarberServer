import IParseMailTemplate from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplate): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
