import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [UsersModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
