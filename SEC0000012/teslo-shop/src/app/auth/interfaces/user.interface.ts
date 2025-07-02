import {Role} from '@auth/interfaces/role.interface';

export interface User {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    Role[];
}
