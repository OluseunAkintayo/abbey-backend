export interface UserProps {

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

export interface IUSerService {
  getUser(username: string): Promise<GenericResponseProps>;
}