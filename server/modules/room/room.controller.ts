import { NextFunction, Response } from 'express';
import Container from 'typedi';
import { AuthRequest } from '../../common/interfaces';
import { Twilio } from '../../services/Twilio';
import { RoomService } from './room.service';

class RoomController {
  public async createRoom(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const roomServiceInstance = Container.get(RoomService);
      const room = userId && (await roomServiceInstance.createRoom(userId, req.body));

      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }

  public async joinRoom(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const roomServiceInstance = Container.get(RoomService);
      const { id, title } = await roomServiceInstance.joinRoom(req.body);
      res.status(200).json({ id, title });
    } catch (error) {
      next(error);
    }
  }

  public async getTurnCredentials(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await Twilio.getToken();
      res.status(200).json({ token });
    } catch (err) {
      console.log('error occured when fetching server credentials');
      next(err);
    }
  }
}

export const roomController = new RoomController();
