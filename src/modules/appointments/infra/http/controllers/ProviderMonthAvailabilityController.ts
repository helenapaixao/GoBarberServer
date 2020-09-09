import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService.ts';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.id;
    const { month, year } = request.body;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const avalailability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month,
      year,
    });

    return response.json(avalailability);
  }
}
