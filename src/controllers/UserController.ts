import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';

const UserController = Router();
const userService = new UserService();

UserController.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const response = await userService.getUser(id);
  res.json(response);
});

export default UserController;