import { Request } from 'express';
import { UserResponseDto } from '../../users/dto/response/user.response.dto';

interface AuthenticatedRequest extends Request {
  user: UserResponseDto;
}

export default AuthenticatedRequest;
