import { Router, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { UserDtoProps } from '../lib/types';
import validate from '../lib/validate';
import { userDtoSchema } from '../schema/user';
import { checkToken } from '../middleware/check-token';

class AuthController {
  private router: Router;
  private authService: AuthService;

  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/register", validate(userDtoSchema), this.register.bind(this));
    this.router.post("/login", validate(userDtoSchema), this.login.bind(this));
    this.router.post("/logout", checkToken, this.logout.bind(this));
  }

  private async register(req: Request, res: Response) {
    const user: UserDtoProps = req.body;
    try {
      const response = await this.authService.register(user);
      if (response.success) {
        res.status(201).json(response);
        return;
      }
      res.status(400).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        data: error
      });
    }
  }

  private async login(req: Request, res: Response) {
    const user: UserDtoProps = req.body;
    try {
      const response = await this.authService.login(user);
      if (response.success) {
        res.status(200).json(response);
        return;
      }
      res.status(400).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        data: error
      });
    }
  }

  private async logout(req: Request, res: Response) {
    const auth = req.headers.authorization;
    const token: string | undefined = auth?.split(" ")[1];
    if(token) {
      try {
        const response = await this.authService.logout(token);
        if (response.success) {
          res.status(200).json(response);
          return;
        }
        res.status(400).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          data: error
        });
      }
      return;
    }
    res.status(500).json({
      success: false,
      data: "Token not found"
    });
  }

  public getRouter() {
    return this.router;
  }
}

export default new AuthController().getRouter();
