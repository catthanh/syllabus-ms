import { DocumentBuilder } from '@nestjs/swagger';

export default new DocumentBuilder()
  .setTitle('Hệ thống quản lý chương trình đào tạo')
  .setDescription('Mô tả API Hệ thống quản lý chương trình đào tạo')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
