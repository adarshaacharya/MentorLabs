import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { UsersService } from './users.service';

class UsersController {
  public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersServiceInstance = Container.get(UsersService);
      const { token } = await usersServiceInstance.createAccount(req.body);
      res.json({ ok: true, token });
    } catch (e) {
      next(e);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersServiceInstance = Container.get(UsersService);
      const { token } = await usersServiceInstance.login(req.body);
      res.json({ ok: true, token });
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();
