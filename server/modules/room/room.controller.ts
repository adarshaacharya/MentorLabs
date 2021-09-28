import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../common/interfaces';

class RoomController {
  public async createRoom(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      // const roomServiceInstance = Container.get(RoomService)
    } catch (error) {
      next(next);
    }
  }
}

export const roomController = new RoomController();
