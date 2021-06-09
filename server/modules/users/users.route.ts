import { Router } from 'express';

import { usersController } from './users.controller';
import { validationMiddleware } from '../../common/middlewares/validaton.middleware';
import { CreateAccountInput } from './dtos/create-user.dto';

export const router: Router = Router();

router.post('/', validationMiddleware(CreateAccountInput), usersController.createAccount);
