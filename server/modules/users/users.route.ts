import { Router } from 'express';

import { usersController } from './users.controller';
import { validationMiddleware } from '../../common/middlewares/validaton.middleware';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { authJwt } from 'common/middlewares/auth.middleware';

export const router: Router = Router();

/**
 * @method GET
 * @route /api/users/me
 * @description : fetch logged in user details
 * @acces private
 */
router.get('/me', [authJwt], usersController.me);

/**
 * @method POST
 * @route /api/users/create-account
 * @description : login registered user to app
 * @acces public
 */
router.post('/create-account', validationMiddleware(CreateAccountInput), usersController.createAccount);

/**
 * @method POST
 * @route /api/users/login
 * @description : login registered user to app
 * @acces public
 */
router.post('/login', validationMiddleware(LoginInput), usersController.login);
