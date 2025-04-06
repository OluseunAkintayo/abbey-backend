import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { decodeToken } from "../lib/decode-token";
import { GenericResponseProps, IUSerService, UserPofileUpdateProps } from "../lib/types";
import jsonwebtoken from 'jsonwebtoken';

class UserService implements IUSerService {
  private users = AppDataSource.getRepository(User);

  constructor() {
  }

  async getUser(username: string): Promise<GenericResponseProps> {
    try {
      const user = await this.users.findOne({
        where: { email: username },
        select: ["id", "firstName", "lastName", "createdAt"]
      });
      const response: GenericResponseProps = {
        data: user,
        message: "OK",
        success: true
      }
      return response;
    } catch (error) {
      return {
        data: error,
        message: "An error occurred",
        success: false
      }
    }
  }

  async getUserProfile(token: string): Promise<GenericResponseProps> {
    const id = decodeToken(token)?.id;
    const user = await this.users.findOne({
      where: { id },
      select: ["id", "firstName", "lastName", "email", "isActive", "picture", "lastLoginDate"]
    });
    if (!user) {
      return {
        success: false,
        message: "Error retrieving user"
      }
    }
    return {
      success: true,
      message: "User profile loaded successfully",
      data: user
    }
  }

  async updateProfile(id: string, profile: UserPofileUpdateProps): Promise<GenericResponseProps> {
    const user = await this.users.findOne({ where: { id } });
    if(!user) {
      return {
        success: false,
        message: "User not found"
      }
    }

    if (profile.firstName !== undefined) {
      user.firstName = profile.firstName;
    }
    
    if (profile.lastName !== undefined) {
      user.lastName = profile.lastName;
    }
    
    if (profile.picture !== undefined) {
      user.picture = profile.picture;
    }
    
    if (Boolean(profile.isActive)) {
      user.isActive = profile.isActive;
    }

    return {
      success: true,
      message: "Updated successfully"
    }
  }
}

export default UserService;
