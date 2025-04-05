import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { GenericResponseProps, IUSerService } from "../lib/types";

class UserService implements IUSerService {
  private users = AppDataSource.getRepository(User);

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
}

export default UserService;
