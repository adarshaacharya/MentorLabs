import { Router } from 'express';

import { usersController } from './users.controller';
import { validationMiddleware } from '../../common/middlewares/validaton.middleware';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';

export const router: Router = Router();

router.post('/create-account', validationMiddleware(CreateAccountInput), usersController.createAccount);

router.post('/login', validationMiddleware(LoginInput), usersController.login);
