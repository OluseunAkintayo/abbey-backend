export interface UserPofileUpdateProps {
  firstName?: string;
  lastName?: string;
  picture?: string;
  bio?: string;
  isActive?: boolean;
  username?: string;
}

export interface UserDtoProps {
  email: string;
  passcode: string;
}

export interface GenericResponseProps {
  success: boolean;
  message?: string;
  data?: any
}

export interface IAuthService {
  register(user: UserDtoProps): Promise<GenericResponseProps>;
  login(user: UserDtoProps): Promise<GenericResponseProps>;
}

export interface IFollowerService {
  followUser(selfId: number, userId: number): Promise<GenericResponseProps>;
  unfollowUser(selfId: number, userId: number): Promise<GenericResponseProps>;
  getFollowers(userId: number): Promise<GenericResponseProps>;
  getFollowing(userId: number): Promise<GenericResponseProps>;
}

export interface IUSerService {
  getUser(username: string): Promise<GenericResponseProps>;
}

export interface Follower {
  userId: number;
  date: Date;
}

export interface Following extends Follower {}
