import { Router } from 'express';
import { Role } from '../../common/enums';
import { checkRole, createValidator, checkJwt } from '../../common/middlewares';
import { CreateMentorshipInput } from './dtos/create-mentorship.dto';
import { mentorshipsController } from './mentoships.controller';

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
