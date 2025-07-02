import {User} from '@auth/interfaces/user.interface';

export interface UserResponse{
  user : User,
  token: string
}
