import { Router } from 'express';
import { Role } from '../../common/enums';
import { checkJwt, checkRole } from '../../common/middlewares';
import { roomController } from './room.controller';

export const router: Router = Router();

/**
 * @method POST
 * @route /api/room/create-room
 * @description : create a new room
 * @acces private
 */
router.post('/create-room', [checkJwt, checkRole([Role.STUDENT, Role.TEACHER])], roomController.createRoom);

/**
 * @method POST
 * @route /api/room/join-room
 * @description : create a new room
 * @acces private
 */
router.post('/join-room', [checkJwt, checkRole([Role.STUDENT, Role.TEACHER])], roomController.joinRoom);
