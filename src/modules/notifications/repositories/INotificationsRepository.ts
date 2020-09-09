import ICreateNotificationsDTO from '../dtos/ICreateNotificationsDTO';
import Notification from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>;
}
