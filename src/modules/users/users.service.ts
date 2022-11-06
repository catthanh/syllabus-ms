import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { PaginationResponseDto } from '../common/dto/response/pagination.response.dto';
import { CreateUserDto } from './dto/request/create-user.request.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UserEntity } from './entities/user.entity';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { ResponseDto } from '../common/dto/response/base.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getByUsername(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ username: email });
    if (user) {
      return user;
    }
    throw new HttpException('Username does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getList(
    request: PaginationQueryDto,
  ): Promise<PaginationResponseDto<UserResponseDto>> {
    const { page, limit } = request;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const [users, total] = await queryBuilder.getManyAndCount();

    return new PaginationResponseBuilder<UserResponseDto>()
      .withCode(HttpStatus.OK)
      .withMessage('Get list of users successfully')
      .withData(users, UserResponseDto)
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }

  async get(id: number): Promise<ResponseDto<UserResponseDto>> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (user) {
      return new ResponseBuilder<UserResponseDto>()
        .withCode(HttpStatus.OK)
        .withMessage('Get user successfully')
        .withData(user, UserResponseDto)
        .build();
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }
}
