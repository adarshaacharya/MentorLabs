import { Router } from 'express';
import { Role } from '../../common/enums/role.enum';
import { checkJwt } from '../../common/middlewares/auth.middleware';
import { checkRole } from '../../common/middlewares/roles.middleware';
import { createValidator } from '../../common/middlewares/validaton.middleware';
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
 * @route /api/users/students/profile
 * @description create student profile
 * @access private
 */
router.post(
  '/student-profile',
  [checkJwt, checkRole([Role.STUDENT]), createValidator(CreateProfileInput)],
  usersController.createStudentProfile,
);
