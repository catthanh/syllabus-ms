import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceMaterialsEntity } from './reference-materials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenceMaterialsEntity])],
  providers: [],
  exports: [],
})
export class ReferenceMaterialsModule {}
