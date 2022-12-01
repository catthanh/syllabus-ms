import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SeederOptions } from 'typeorm-extension';

config({
  path: '.env.development',
});

const configService = new ConfigService();
/**
 * typeORM CLI configuration
 */

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  migrations: ['src/database/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    'src/modules/**/*.entity.ts',
    'src/modules/**/entities/*.entity.ts',
  ],
  seeds: ['src/database/seeds/**/*{.ts,.js}', 'src/database/seeds/*{.ts,.js}'],
  factories: [
    'src/database/factories/**/*{.ts,.js}',
    'src/database/factories/*{.ts,.js}',
  ],
};

export const dataSource = new DataSource(options);
