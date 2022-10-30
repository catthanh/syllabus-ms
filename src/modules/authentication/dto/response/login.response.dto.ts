import { ResponseDto } from '@common/dto/response.dto.ts/base.response.dto';
import { UserResponseDto } from '@modules/users/dto/response/user.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponseData {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  user: UserResponseDto;
}
export class LoginResponseDto extends ResponseDto<LoginResponseData> {
  @ApiProperty({
    type: LoginResponseData,
  })
  @Expose()
  data: LoginResponseData;
}
