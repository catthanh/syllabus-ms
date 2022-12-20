import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/guard/jwt-authentication.guard';
import {
  PaginationResponseBuilder,
  ResponseBuilder,
} from '../common/util/helper.util';
import { ApprovalRequestService } from './approval-request.service';
import { ApprovalRequestResponseDto } from './dto/response/approval-request.response.dto';

@UseGuards(JwtAuthenticationGuard)
@ApiTags('Approval Request')
@Controller('approval-request')
export class ApprovalRequestController {
  constructor(
    private readonly approvalRequestService: ApprovalRequestService,
  ) {}

  // @Post()
  // @ApiOperation({
  //   summary: 'Tạo yêu cầu phê duyệt',
  // })
  // async create(@Body() body: CreateApprovalRequestDto, @Req() request: any) {
  //   const result = await this.approvalRequestService.create(body, request.user);
  //   return result;
  // }

  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Phê duyệt yêu cầu',
  })
  async approve(@Req() request: any) {
    const result = await this.approvalRequestService.approve(
      request.params.id,
      request.user,
      request.body?.comment,
    );
    return new ResponseBuilder<ApprovalRequestResponseDto>()
      .withCode(200)
      .withData(result, ApprovalRequestResponseDto)
      .withMessage('Phê duyệt yêu cầu thành công');
  }

  @Patch(':id/reject')
  @ApiOperation({
    summary: 'Từ chối yêu cầu',
  })
  async reject(@Req() request: any) {
    const result = await this.approvalRequestService.approve(
      request.params.id,
      request.user,
      request.body?.comment,
    );
    return new ResponseBuilder<ApprovalRequestResponseDto>()
      .withCode(200)
      .withData(result, ApprovalRequestResponseDto)
      .withMessage('Từ chối yêu cầu thành công');
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin yêu cầu',
  })
  async get(@Req() request: any) {
    const result = await this.approvalRequestService.get(request.params.id);
    return new ResponseBuilder<ApprovalRequestResponseDto>()
      .withCode(200)
      .withData(result, ApprovalRequestResponseDto)
      .withMessage('Lấy thông tin yêu cầu thành công')
      .build();
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách yêu cầu',
  })
  async getAll(@Req() request: any) {
    const [data, page, limit, total] =
      await this.approvalRequestService.getList(request.query);
    return new PaginationResponseBuilder<ApprovalRequestResponseDto>()
      .withCode(200)
      .withData(data, ApprovalRequestResponseDto)
      .withMessage('Lấy danh sách yêu cầu thành công')
      .withPage(page)
      .withLimit(limit)
      .withTotal(total)
      .build();
  }
}
