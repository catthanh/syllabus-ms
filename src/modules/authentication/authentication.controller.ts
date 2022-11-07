import { ResponseBuilder } from '@common/util/helper.util';
import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import {
  LoginResponseData,
  LoginResponseDto,
} from './dto/response/login.response.dto';
import { LocalAuthenticationGuard } from './guard/authentication.guard';
import AuthenticatedRequest from './interface/authenticated-request';
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
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    type: LoginResponseDto,
  })
  @Post('log-in')
  async logIn(@Req() request: AuthenticatedRequest) {
    const { user } = request;
    const accessToken = this.authenticationService.signJwtToken(user.id);
    return new ResponseBuilder()
      .withCode(HttpStatus.OK)
      .withMessage('Login successfully')
      .withData({ user, accessToken }, LoginResponseData)
      .build();
  }
}
