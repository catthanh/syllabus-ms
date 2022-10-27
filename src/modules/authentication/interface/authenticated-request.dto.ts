import { Request } from 'express';
import { UserEntity } from 'src/modules/users/user.entity';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;
