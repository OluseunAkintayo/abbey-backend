import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { GenericResponseProps, IAuthService, UserDtoProps } from "../lib/types";
import bcrypt from 'bcrypt';

const users = AppDataSource.getRepository(User);

class AuthService implements IAuthService {
  async register(user: UserDtoProps): Promise<GenericResponseProps> {
    const existingUser = await users.findOne({
      where: {email: user.email}
    });

    if(existingUser) {
      const err = {
        success: false,
        message: "Username already exists",
        data: existingUser
      }
      return err;
    }
    
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS) ?? 10);
    const hash = bcrypt.hashSync(user.passcode, salt);

    users.create({
      email: user.email,
      passwordHash: hash,
      isActive: true
    });

    await users.save({
      email: user.email,
      passwordHash: hash,
      isActive: true
    });
    
    const response: GenericResponseProps = {
      data: { user: user.email },
      message: "Registration successful",
      success: true
    }
    return response;
  }

  async login(user: UserDtoProps): Promise<GenericResponseProps> {
    const response: GenericResponseProps = {
      data: user,
      message: "OK",
      success: true
    }
    return response;
  }
}

export default AuthService;
