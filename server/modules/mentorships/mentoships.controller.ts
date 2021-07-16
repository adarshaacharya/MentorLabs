import { AuthRequest } from '../../common/interfaces';
import { NextFunction, Response } from 'express';
import Container from 'typedi';
import { MentorshipsService } from './mentorships.service';
import { validateIdOrThrow } from '../../common/validator';

class MentorshipsController {
  public async createMentorship(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);

      const mentorId = validateIdOrThrow(+req.params.mentorId);
      const currentId = req.user && req.user.id;

      await mentorshipsServiceInstance.createMentorship({ mentorId, menteeId: currentId, ...req.body });
      res.status(201).json({ ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async getMentorshipRequests(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);

      const userId = validateIdOrThrow(+req.params.userId);
      const currentUserId = req.user?.id;

      const requests = currentUserId && (await mentorshipsServiceInstance.getMentorshipRequests(userId, currentUserId));

      res.status(201).json({ requests });
    } catch (error) {
      next(error);
    }
  }
}

export const mentorshipsController = new MentorshipsController();
