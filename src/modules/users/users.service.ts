import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
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
import { ChangePasswordRequestDto } from './dto/request/change-password.request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';
import { RoleDepartmentUser } from './entities/role-department-user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleDepartmentUser)
    private roleDepartmentUserRepository: Repository<RoleDepartmentUser>,
  ) {}

  async getByUsername(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ username: username });
    if (user) {
      return user;
    }
    throw new HttpException('Username does not exist', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['userToDepartments', 'userToDepartments.department'],
    });
    if (user) {
      return user;
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getList(
    request: PaginationQueryDto,
  ): Promise<PaginationResponseDto<UserResponseDto>> {
    const { page, limit, filter, search } = request;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.leftJoinAndSelect(
      'user.userToDepartments',
      'userToDepartments',
    );
    queryBuilder.leftJoinAndSelect(
      'userToDepartments.department',
      'department',
    );
    if (limit) {
      queryBuilder.take(limit);
    }
    if (page) {
      queryBuilder.skip((page - 1) * limit);
    }
    if (search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.where('user.username ILIKE :search', { search: `%${search}%` });
          qb.orWhere('user.name ILIKE :search', { search: `%${search}%` });
          qb.orWhere('department.name ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    if (filter) {
      switch (filter.filterBy) {
        case 'username':
          queryBuilder.where('user.username ILIKE :username', {
            username: `%${filter.filterValue}%`,
          });
          break;
        case 'name':
          queryBuilder.where('user.firstName ILIKE :firstName', {
            name: `%${filter.filterValue}%`,
          });
          break;
        case 'role':
          queryBuilder.where('userToDepartments.role ILIKE :role', {
            role: `%${filter.filterValue}%`,
          });
          break;
        case 'department':
          queryBuilder.where('department.name ILIKE :department', {
            department: `%${filter.filterValue}%`,
          });
          break;
        default:
          break;
      }
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
      relations: ['userToDepartments', 'userToDepartments.department'],
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

  async changePassword(request: ChangePasswordRequestDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: request.userId },
    });
    if (user) {
      user.password = request.newPassword;
      return await this.usersRepository.save(user);
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    userData: UpdateUserRequestDto,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (user) {
      user.username = userData.username;
      user.name = userData.name;
      user.userToDepartments = userData.userToDepartments.map((item) =>
        this.roleDepartmentUserRepository.create(item),
      );
      return await this.usersRepository.save(user);
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }
}
