import { Router } from 'express';
import { Role } from '../../common/enums';
import { checkRole, createValidator, checkJwt } from '../../common/middlewares';
import { CreateMentorshipInput } from './dtos/create-mentorship.dto';
import { mentorshipsController } from './mentoships.controller';

export const router: Router = Router();

/**
 * @method POST
 * @route /api/mentorships
 * @description : Creates a new mentorship request for the given mentor
 * @acces private
 */
router.post(
  '/:mentorId/apply',
  [checkJwt, checkRole([Role.STUDENT]), createValidator(CreateMentorshipInput)],
  mentorshipsController.createMentorship,
);

/**
 * @method POST
 * @route /api/:userId/requests
 * @description : Returns the mentorship requests for a mentor
 * @acces private
 */
router.get('/:userId/requests', [checkJwt, checkRole([Role.TEACHER])], mentorshipsController.getMentorshipRequests);
