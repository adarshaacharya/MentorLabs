import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';

class UsersController {
  public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await usersService.createAccount(req.body);
      res.json({ ok: true });
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();
