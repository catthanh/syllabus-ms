import { IBaseResponseDto } from '../interface/base.response.dto.interface';

export class BaseResponseDto implements IBaseResponseDto {
  statusCode: number;
  message: string;
  data: any;
}
