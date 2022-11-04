import { Request } from 'express';
import { UserEntity } from '../../users/entities/user.entity';

interface AuthenticatedRequest extends Request {
  user: UserEntity;
}

export default AuthenticatedRequest;
