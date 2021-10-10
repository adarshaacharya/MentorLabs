import { Router } from 'express';
import { Role } from '../../common/enums';
import { checkJwt, checkRole, createValidator } from '../../common/middlewares';
import { CreateRoomInput } from './dtos/create-room.dto';
import { JoinRoomInput } from './dtos/join-room.dto';
import { roomController } from './room.controller';

export const router: Router = Router();

/**
 * @method POST
 * @route /api/room/create-room
 * @description : create a new room
 * @acces private
 */
router.post(
  '/create-room',
  [checkJwt, checkRole([Role.STUDENT, Role.TEACHER]), createValidator(CreateRoomInput)],
  roomController.createRoom,
);

/**
 * @method POST
 * @route /api/room/join-room
 * @description : create a new room
 * @acces private
 */
router.post(
  '/join-room',
  [checkJwt, checkRole([Role.STUDENT, Role.TEACHER]), createValidator(JoinRoomInput)],
  roomController.joinRoom,
);

/**
 * @method POST
 * @route /api/room/get-turn-credentials
 * @description : get turn server credentials
 * @acces GET
 */
router.get(
  '/get-turn-credentials',
  [checkJwt, checkRole([Role.STUDENT, Role.TEACHER])],
  roomController.getTurnCredentials,
);
