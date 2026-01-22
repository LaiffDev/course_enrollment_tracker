import { UserModel } from './user-model';

export interface AuthModel {
  token: string;
  logged: UserModel;
}
