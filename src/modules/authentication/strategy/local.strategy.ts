import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/user.entity';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string): Promise<UserEntity> {
    return this.authenticationService.getAuthenticatedUser(username, password);
  }
}
