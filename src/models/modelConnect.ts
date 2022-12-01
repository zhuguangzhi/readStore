import { globalState } from '@/models/global';
import { userState } from '@/models/user';

export interface ConnectState {
  global: globalState;
  userModel: userState;
}
