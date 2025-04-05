import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import { checkToken } from '../middleware/check-token';

const UserController = Router();
const userService = new UserService();

UserController.get("/profile", checkToken, async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const response = await userService.getUserProfile();
  res.json(response);
});

export default UserController;