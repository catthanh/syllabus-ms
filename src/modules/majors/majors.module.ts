import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorEntity } from './major.entity';
import { MajorsController } from './majors.controller';
import { MajorsService } from './majors.service';

@Module({
  imports: [TypeOrmModule.forFeature([MajorEntity])],
  controllers: [MajorsController],
  providers: [MajorsService],
})
export class MajorsModule {}
