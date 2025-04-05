import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { GenericResponseProps, IAuthService, UserDtoProps } from "../lib/types";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dayjs from "dayjs";

class AuthService implements IAuthService {
  private users = AppDataSource.getRepository(User);
  private jwtKey: string;
  private exp: string;

  constructor() {
    this.jwtKey = process.env.JWT_SECRET ?? "";
    this.exp = dayjs().add(1, 'day').toISOString();
  }

  async register(user: UserDtoProps): Promise<GenericResponseProps> {
    const existingUser = await this.users.findOne({
      where: { email: user.email }
    });

    if (existingUser) {
      const err = {
        success: false,
        message: "Username already exists"
      }
      return err;
    }

    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS) ?? 10);
    const hash = bcrypt.hashSync(user.passcode, salt);

    this.users.create({
      email: user.email,
      passwordHash: hash,
      isActive: true
    });

    await this.users.save({
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
    const userObject = await this.users.findOne({
      where: { email: user.email }
    });

    if (!userObject) {
      return {
        message: "Incorrect credentials",
        success: false
      }
    }

    const passwordVerified = await bcrypt.compare(user.passcode, userObject.passwordHash);

    if (!passwordVerified) {
      return {
        message: "Incorrect credentials. Please check and try again",
        success: false
      }
    }

    const token = await this.generateToken({ id: userObject.id, email: userObject.email });

    if (!token.success) {
      return {
        success: false,
        message: "There was an error signing in. Please try again after some time"
      }
    }

    const response: GenericResponseProps = {
      data: {
        user: {
          id: userObject.id,
          email: userObject.email
        },
        token: token.data
      },
      message: "Login successful!",
      success: true
    }
    return response;
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.users.update(userId, {
      lastLoginDate: new Date()
    });
  }

  async generateToken({ id, email }: { id: string; email: string }): Promise<GenericResponseProps> {
    if (this.jwtKey) {
      const token = jsonwebtoken.sign(
        { id, email, exp: Date.parse(this.exp) },
        this.jwtKey,
        { algorithm: 'HS384' }
      );
      return {
        success: true,
        data: token,
      }
    }
    return {
      success: false,
      message: "Error generating token"
    }
  }

  // async logout(token: string) {
  //   if (this.jwtKey) {
  //     const decoded_token = jsonwebtoken.verify(token, this.jwtKey) as { id: string; email: string; exp: number, iat: number };
  //     const exp = decoded_token.exp;
  //     const remaining_time = exp - new Date().getTime();
  //     if (remaining_time > 0) {
  //       await redis.set(token, "invalidated", "PX", remaining_time);
  //     }
  //     return { success: true, message: "User logged out" };
  //   }
  //   return { success: false, message: "Unable to decode token" };
  // }

}

export default AuthService;
