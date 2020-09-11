import { Router } from 'express';

import SessionController from '../controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().email().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
