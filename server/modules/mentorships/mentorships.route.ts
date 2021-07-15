import { Role } from '../../common/enums/role.enum';
import { checkJwt } from '../../common/middlewares/auth.middleware';
import { Router } from 'express';
import { mentorshipsController } from './mentoships.controller';
import { createValidator } from '../../common/middlewares/validaton.middleware';
import { CreateMentorshipInput } from './dtos/create-mentorship.dto';
import { checkRole } from '../../common/middlewares/roles.middleware';

export const router: Router = Router();

/**
 * @method POST
 * @route /api/mentorships
 * @description : fetch logged in user details
 * @acces private
 */
router.post(
  '/:mentorId/apply',
  [checkJwt, checkRole([Role.STUDENT]), createValidator(CreateMentorshipInput)],
  mentorshipsController.createMentorship,
);
