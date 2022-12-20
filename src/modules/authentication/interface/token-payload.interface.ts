import { UserToDepartments } from '../../users/dto/response/user.response.dto';

export interface TokenPayload {
  userId: number;
  id: number;
  name: string;
  userToDepartments: UserToDepartments[];
}
