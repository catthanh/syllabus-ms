import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from '../../../users/dto/request/create-user.request.dto';

export class RegisterRequestDto extends CreateUserDto {}
