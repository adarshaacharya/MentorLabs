import { AuthRequest } from '../../common/interfaces/auth-request.interface';
import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { validateIdOrThrow } from '../../common/validator';
import { UsersService } from './users.service';
import { AUTH_COOKIE, THIRTY_DAY_COOKIE } from '../../common/constants/cookies';

class UsersController {
  public async me(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      validateIdOrThrow(req.user?.id);
      const usersServiceInstance = Container.get(UsersService);
      const user = await usersServiceInstance.me(req.user?.id);
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersServiceInstance = Container.get(UsersService);
      const { token, ...user } = await usersServiceInstance.createAccount(req.body);
      res.cookie(AUTH_COOKIE, token, THIRTY_DAY_COOKIE);
      res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersServiceInstance = Container.get(UsersService);
      const { token, ...user } = await usersServiceInstance.login(req.body);
      res.cookie(AUTH_COOKIE, token, THIRTY_DAY_COOKIE);
      res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }

  public logout(_: Request, res: Response): void {
    res.clearCookie(AUTH_COOKIE);
    res.status(200).json({ ok: true });
  }

  public async creatProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const usersServiceInstance = Container.get(UsersService);
      const profile = userId && (await usersServiceInstance.creatProfile(userId, req.body));
      res.status(200).json({ profile });
    } catch (e) {
      next(e);
    }
  }

  public async findOneById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = validateIdOrThrow(+req.params.userId);
      const usersServiceInstance = Container.get(UsersService);
      const user = userId && (await usersServiceInstance.findOneById(userId));
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async getTeachers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersServiceInstance = Container.get(UsersService);
      const mentors = await usersServiceInstance.getTeachers();
      console.log(mentors);
      res.status(200).json(mentors);
    } catch (e) {
      next(e);
    }
  }

  public async getStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usersServiceInstance = Container.get(UsersService);
      const students = await usersServiceInstance.getStudents();
      res.status(200).json(students);
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();
