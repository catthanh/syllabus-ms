import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/request/pagination-query.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Danh sách người dùng',
    tags: ['Users'],
  })
  @Get()
  async getList(@Query() query: PaginationQueryDto) {
    return this.usersService.getList(query);
  }

  @ApiOperation({
    summary: 'Chi tiết người dùng',
    tags: ['Users'],
  })
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.get(id);
  }
}
