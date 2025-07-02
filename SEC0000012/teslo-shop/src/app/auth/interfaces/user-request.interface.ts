import {Role} from '@auth/interfaces/role.interface';

export interface UserLogin {
  email:    string;
  password: string;
}

export interface UserRegister {
  email:    string;
  fullName: string;
  password: string;
}


export const userLogin1:UserLogin = {
  email: 'test1@google.com',
  password: 'Abc123'
}
