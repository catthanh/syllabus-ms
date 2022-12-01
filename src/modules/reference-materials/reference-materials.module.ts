import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceMaterialsEntity } from './reference-materials.entity';
import { ReferenceMaterialsService } from './reference-materials.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenceMaterialsEntity])],
  providers: [ReferenceMaterialsService],
  exports: [],
})
export class ReferenceMaterialsModule {}
