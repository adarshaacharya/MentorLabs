import { Router } from 'express';
import { Role } from '../../common/enums';
import { checkJwt, checkRole, createValidator } from '../../common/middlewares';
import { CreateAccountInput } from './dtos/create-account.dto';
import { CreateProfileInput } from './dtos/create-profile.dto';
import { LoginInput } from './dtos/login.dto';
import { usersController } from './users.controller';

export const router: Router = Router();

/**
 * @method GET
 * @route /api/users/me
 * @description : fetch logged in user details
 * @acces private
 */
router.get('/me', [checkJwt, checkRole([Role.TEACHER, Role.STUDENT])], usersController.me);

/**
 * @method POST
 * @route /api/users/create-account
 * @description : login registered user to app
 * @acces public
 */
router.post('/create-account', createValidator(CreateAccountInput), usersController.createAccount);

/**
 * @method POST
 * @route /api/users/login
 * @description : login registered user to app
 * @acces public
 */
router.post('/login', createValidator(LoginInput), usersController.login);

/**
 * @method POST
 * @route /api/users/logout
 * @description : logout user
 * @acces private
 */
router.post('/logout', [checkJwt], usersController.logout);

/**
 * @method POST
 * @route /api/users/create-profile
 * @description create student and teachers profile
 * @access private
 */
router.post(
  '/create-profile',
  [checkJwt, checkRole([Role.STUDENT, Role.TEACHER]), createValidator(CreateProfileInput)],
  usersController.creatProfile,
);
