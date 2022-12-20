import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  exports: [CaslAbilityFactory],
  providers: [CaslAbilityFactory],
})
export class CaslModule {}
