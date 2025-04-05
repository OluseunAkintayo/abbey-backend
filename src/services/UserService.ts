import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { GenericResponseProps, IUSerService } from "../lib/types";

const users = AppDataSource.getRepository(User);

class UserService implements IUSerService {
  async getUser(username: string): Promise<GenericResponseProps> {
    try {
      const user = await users.findOne({
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
