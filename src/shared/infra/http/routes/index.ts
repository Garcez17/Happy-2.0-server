import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import orphanagesRouter from '@modules/orphanages/infra/http/routes/orphanages.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orphanages', orphanagesRouter);
routes.use('/password', passwordRouter);

export default routes;
