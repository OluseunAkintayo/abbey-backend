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
  followUser(selfId: string, userId: string): Promise<GenericResponseProps>;
  unfollowUser(selfId: string, userId: string): Promise<GenericResponseProps>;
  getFollowers(userId: string): Promise<GenericResponseProps>;
  getFollowing(userId: string): Promise<GenericResponseProps>;
}

export interface IUSerService {
  getUser(username: string): Promise<GenericResponseProps>;
}

export interface Follower {
  userId: string;
  date: Date;
}

export interface Following extends Follower {}

