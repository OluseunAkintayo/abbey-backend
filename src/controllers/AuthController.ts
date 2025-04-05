import { Router, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { UserDtoProps } from '../lib/types';
import validate from '../lib/validate';
import { userDtoSchema } from '../schema/user';

const AuthController = Router();
const authService = new AuthService();

AuthController.post("/register", validate(userDtoSchema), async (req: Request, res: Response) => {
  const user: UserDtoProps = req.body;
  const response = await authService.register(user);
  res.json(response);
});

export default AuthController;