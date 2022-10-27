import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { LocalAuthenticationGuard } from './guard/authentication.guard';
import RequestWithUser from './interface/request-with-user.dto';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register', tags: ['Authentication'] })
  async register(@Body() registrationData: RegisterRequestDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiOperation({
    tags: ['Authentication'],
    summary: 'Login',
  })
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessToken = this.authenticationService.getCookieWithJwtToken(
      user.id,
    );
    user.password = undefined;

    return { statusCode: 200, data: { ...user, accessToken } };
  }
}
