import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';



import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    throw new Error("Method not implemented.");
  }
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    throw new Error("Method not implemented.");
  }
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async IFindAllInMonthFromProvider({
    month,
    provider_id,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
       {
         return (
          appointment.provider_id === provider_id &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date)  === year
         );
       });
    return appointments;
  }

  public async IFindAllInDayFromProvider({
    month,
    provider_id,

    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
       {
         return (
          appointment.provider_id === provider_id &&
          getDate(appointment.date)  === day &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date)  === year
         );
       });
    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id,user_id });

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    this.appointments.push(appointment);
    return appointment;
  }
}

export default FakeAppointmentsRepository;
