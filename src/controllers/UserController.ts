import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import { checkToken } from '../middleware/check-token';
import { decodeToken } from '../lib/decode-token';
import FollowerService from '../services/FollowerService';
import { UserPofileUpdateProps } from '../lib/types';
import validate from '../lib/validate';
import { userProfileUpdateSchema } from '../schema/user';

class UserController {
  private router: Router;
  private userService: UserService;
  private followerService: FollowerService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.followerService = new FollowerService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/profile", checkToken, this.getProfile.bind(this));
    this.router.put("/profile/update", checkToken, validate(userProfileUpdateSchema), this.updateProfile.bind(this));
    this.router.get("/followers", checkToken, this.getFollowers.bind(this));
    this.router.get("/following", checkToken, this.getFollowing.bind(this));
    this.router.post("/follow", checkToken, this.followUser.bind(this));
    this.router.post("/unfollow", checkToken, this.unfollowUser.bind(this));
  }

  private async getProfile(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    try {
      const response = await this.userService.getUserProfile(token);
      if (response.success) {
        res.status(200).json(response)
        return;
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error has occurred on the server",
        data: error
      });
    }
  }
  
  private async updateProfile(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    const id = decodeToken(token)?.id
    if(!id) {
      res.status(401).json({ error: 'Unable to get user profile' });
      return;
    }

    const profile: UserPofileUpdateProps = req.body;
    try {
      const response = await this.userService.updateProfile(id, profile);
      if (response.success) {
        res.status(200).json(response)
        return;
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error has occurred on the server",
        data: error
      });
    }
  }

  private async followUser(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) return;

    const selfId = decodeToken(token)?.id;
    if (!selfId) {
      res.status(401).json({ message: "Invalid token", success: false });
      return;
    }
    const userId: string = req.body.userId;

    if (selfId !== userId) {
      try {
        const response = await this.followerService.followUser(selfId, userId);
        if (response.success) {
          res.status(200).json(response);
          return;
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          data: error
        });
      }
      return;
    }
    res.status(200).json({
      success: true,
    });
  }

  private async unfollowUser(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) return;

    const selfId = decodeToken(token)?.id;
    if (!selfId) {
      res.status(401).json({ message: "Invalid token", success: false });
      return;
    }
    const userId: string = req.body.userId;
    if (userId !== selfId) {
      try {
        const response = await this.followerService.unfollowUser(selfId, userId);
        if (response.success) {
          res.status(200).json(response);
          return;
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          data: error
        });
      }
      return;
    }
    res.status(200).json({
      success: true,
    });
  }

  private async getFollowers(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) return;

    const my_id = decodeToken(token)?.id;
    if (!my_id) {
      res.status(401).json({ message: "Invalid token", success: false });
      return;
    }
    try {
      const result = await this.followerService.getFollowers(my_id);
      if (result.success) {
        res.status(200).json(result)
        return;
      }
      res.status(400).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        data: error
      });
    }
  }

  private async getFollowing(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) return;

    const my_id = decodeToken(token)?.id;
    if (!my_id) {
      res.status(401).json({ message: "Invalid token", success: false });
      return;
    }
    try {
      const result = await this.followerService.getFollowing(my_id);
      if (result.success) {
        res.status(200).json(result)
        return;
      }
      res.status(400).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        data: error
      });
    }
  }

  public getRouter() {
    return this.router;
  }
}

export default new UserController().getRouter();
