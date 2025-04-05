import { Router, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { UserDtoProps } from '../lib/types';
import validate from '../lib/validate';
import { userDtoSchema } from '../schema/user';

const AuthController = Router();
const authService = new AuthService();

AuthController.post("/register", validate(userDtoSchema), async (req: Request, res: Response) => {
  const user: UserDtoProps = req.body;
  try {
    const response = await authService.register(user);
    if(response.success) res.status(201).json(response);
    res.status(400).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error
    });
  }
});


AuthController.post("/login", validate(userDtoSchema), async (req: Request, res: Response) => {
  const user: UserDtoProps = req.body;
  try {
    const response = await authService.login(user);
    if(response.success) {
      res.status(200).json(response);
      return;
    }
    res.status(400).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      data: error
    });
  }
});

export default AuthController;
