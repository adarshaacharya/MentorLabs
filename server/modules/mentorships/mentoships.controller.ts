import { AuthRequest } from '../../common/interfaces';
import { NextFunction, Response } from 'express';
import Container from 'typedi';
import { MentorshipsService } from './mentorships.service';
import { validateIdOrThrow } from '../../common/validator';

class MentorshipsController {
  public async createMentorship(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);

      const mentorId = validateIdOrThrow(req.params.mentorId);
      const currentId = req.user && req.user.id;

      await mentorshipsServiceInstance.createMentorship({ mentorId, menteeId: currentId, ...req.body });
      res.status(201).json({ ok: true });
    } catch (error) {
      next(error);
    }
  }

  public async getMentorshipRequestsOfMentor(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);

      const userId = req.user?.id;

      const requests = userId && (await mentorshipsServiceInstance.getMentorshipRequestsOfMentor(userId));

      res.status(201).json(requests);
    } catch (error) {
      next(error);
    }
  }

  public async getMentorshipRequestsByMentee(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);

      const userId = req.user?.id;

      const requests = userId && (await mentorshipsServiceInstance.getMentorshipRequestsByMentee(userId));

      res.status(201).json(requests);
    } catch (error) {
      next(error);
    }
  }

  public async findMentorshipById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);
      const id = validateIdOrThrow(req.params.id);
      const currentId = req.user && req.user.id;

      const request = currentId && (await mentorshipsServiceInstance.findMentorshipById(id, currentId));

      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  }

  public async updateMentorshipRequestStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);
      const mentorshipId = validateIdOrThrow(req.params.id);

      const status = await mentorshipsServiceInstance.updateMentorshipRequestStatus(mentorshipId, req.body);
      res.status(201).json(status);
    } catch (error) {
      next(error);
    }
  }

  public async createMentorshipResponse(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const mentorshipsServiceInstance = Container.get(MentorshipsService);
      const mentorshipId = validateIdOrThrow(req.params.id);

      const response = await mentorshipsServiceInstance.createMentorshipResponse(mentorshipId, req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const mentorshipsController = new MentorshipsController();
