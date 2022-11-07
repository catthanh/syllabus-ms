import { ResponseDto } from '@common/dto/response/base.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/modules/users/dto/response/user.response.dto';

export class LoginResponseData {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
export class LoginResponseDto extends ResponseDto<LoginResponseData> {
  @ApiProperty({
    type: LoginResponseData,
  })
  @Expose()
  data: LoginResponseData;
}
