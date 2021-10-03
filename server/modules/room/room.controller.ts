import { NextFunction, Response } from 'express';
import Container from 'typedi';
import { AuthRequest } from '../../common/interfaces';
import { RoomService } from './room.service';

class RoomController {
  public async createRoom(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const roomServiceInstance = Container.get(RoomService);
      const room = userId && (await roomServiceInstance.createRoom(userId, req.body));

      res.status(200).json(room);
    } catch (error) {
      next(next);
    }
  }

  public async joinRoom(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const roomServiceInstance = Container.get(RoomService);
      const { id, title } = await roomServiceInstance.joinRoom(req.body);

      res.status(200).json({ id, title });
    } catch (error) {
      next(next);
    }
  }
}

export const roomController = new RoomController();
