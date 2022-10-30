import { ResponseCode } from '@common/constants/http-code.enum';
import { ResponseDto } from '@common/dto/response.dto.ts/base.response.dto';
import { plainToInstance } from 'class-transformer';

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export class ResponseBuilder<T> {
  response: ResponseDto<T>;
  constructor() {
    this.response = new ResponseDto<T>();
  }
  withCode(code: ResponseCode): ResponseBuilder<T> {
    this.response.statusCode = code;
    return this;
  }
  withMessage(message: string): ResponseBuilder<T> {
    this.response.message = message;
    return this;
  }
  withData(data: any, type: Type<T>): ResponseBuilder<T> {
    this.response.data = plainToInstance<T, any>(type, data);
    return this;
  }
  build(): ResponseDto<T> {
    return this.response;
  }
}
