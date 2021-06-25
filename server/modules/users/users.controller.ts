import { AuthRequest } from 'common/interfaces/auth-request.interface';
import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import validateIdOrThrow from 'utils/validator.util';
import { UsersService } from './users.service';

class UsersController {
  public async me(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      validateIdOrThrow(req.user.id);
      const usersServiceInstance = Container.get(UsersService);
      const user = await usersServiceInstance.me(req.user.id);
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

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
