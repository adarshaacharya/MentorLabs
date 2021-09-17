import { Router } from 'express';
import { Role } from '../../common/enums';
import { checkRole, createValidator, checkJwt } from '../../common/middlewares';
import { CreateMentorshipInput } from './dtos/create-mentorship.dto';
import { mentorshipsController } from './mentoships.controller';

export const router: Router = Router();

/**
 * @method POST
 * @route /api/mentorships/apply/:mentorId
 * @description : Creates a new mentorship request for the given mentor
 * @acces private
 */
router.post(
  '/apply/:mentorId',
  [checkJwt, checkRole([Role.STUDENT]), createValidator(CreateMentorshipInput)],
  mentorshipsController.createMentorship,
);

/**
 * @method GET
 * @route /api/mentorships/mentor-requests
 * @description : Finds all mentorship requests received by a mentor
 * @acces private
 */
router.get(
  '/mentor-requests',
  [checkJwt, checkRole([Role.TEACHER])],
  mentorshipsController.getMentorshipRequestsOfMentor,
);

/**
 * @method POST
 * @route /api/mentorships/mentee-requests
 * @description : Returns all the mentorship requests send by a mentee
 * @acces private
 */
router.get(
  '/mentee-requests',
  [checkJwt, checkRole([Role.STUDENT])],
  mentorshipsController.getMentorshipRequestsByMentee,
);

/**
 * @method POST
 * @route /api/mentorships/requests/:id
 * @description : Returns deatisl for mentorship request by id
 * @acces private
 */
router.get(
  '/requests/:id',
  [checkJwt, checkRole([Role.STUDENT, Role.TEACHER])],
  mentorshipsController.findMentorshipById,
);
