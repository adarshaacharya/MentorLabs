import { checkRole } from '../../common/middlewares/roles.middleware';
import { Router } from 'express';
import { checkJwt } from '../../common/middlewares/auth.middleware';
import { validationMiddleware } from '../../common/middlewares/validaton.middleware';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { usersController } from './users.controller';
import { ROLE } from '../../common/enums/role.enum';

export const router: Router = Router();

/**
 * @method GET
 * @route /api/users/me
 * @description : fetch logged in user details
 * @acces private
 */
router.get('/me', [checkJwt, checkRole([ROLE.Teacher, ROLE.Student])], usersController.me);

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

/**
 * @method POST
 * @route /api/users/logout
 * @description : logout user
 * @acces public
 */
router.post('/logout', [checkJwt], usersController.logout);
