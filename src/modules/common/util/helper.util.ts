import { ResponseDto } from '@common/dto/response/base.response.dto';
import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginationResponseDto } from '../dto/response/pagination.response.dto';

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
  withCode(code: HttpStatus): ResponseBuilder<T> {
    this.response.statusCode = code;
    return this;
  }
  withMessage(message: string): ResponseBuilder<T> {
    this.response.message = message;
    return this;
  }
  withData(data: any, type: Type<T>): ResponseBuilder<T> {
    this.response.data = plainToInstance<T, any>(type, data, {
      excludeExtraneousValues: true,
    });
    return this;
  }
  build(): ResponseDto<T> {
    return this.response as ResponseDto<T>;
  }
}

export class PaginationResponseBuilder<T> {
  response: PaginationResponseDto<T>;
  constructor() {
    this.response = new PaginationResponseDto<T>();
  }
  withCode(code: HttpStatus): PaginationResponseBuilder<T> {
    this.response.statusCode = code;
    return this;
  }
  withMessage(message: string): PaginationResponseBuilder<T> {
    this.response.message = message;
    return this;
  }
  withData(data: any[], type: Type<T>): PaginationResponseBuilder<T> {
    this.response.data = plainToInstance<T, any>(type, data, {
      excludeExtraneousValues: true,
    });
    return this;
  }
  withPage(page: number): PaginationResponseBuilder<T> {
    this.response.page = page;
    return this;
  }
  withLimit(limit: number): PaginationResponseBuilder<T> {
    this.response.limit = limit;
    return this;
  }
  withTotal(total: number): PaginationResponseBuilder<T> {
    this.response.total = total;
    return this;
  }
  build(): PaginationResponseDto<T> {
    return this.response as PaginationResponseDto<T>;
  }
}
