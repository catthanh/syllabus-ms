import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.request.dto';

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
}
