import { AuthRequest } from '../../common/interfaces/auth-request.interface';
import { NextFunction, Response } from 'express';
import Container from 'typedi';
import { MentorshipsService } from './mentorships.service';

class MentorshipsController {
  public async createMentorship(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);

      const currentId = req.user && req.user.id;
      const mentorId = req.params.mentorId;

      await mentorshipsServiceInstance.createMentorship({ mentorId, menteeId: currentId, ...req.body });
      res.status(201).json({ ok: true });
    } catch (error) {
      next(error);
    }
  }
}

export const mentorshipsController = new MentorshipsController();
