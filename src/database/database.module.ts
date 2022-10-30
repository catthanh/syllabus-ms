import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseLogger from './logger/database.logger';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        logger: new DatabaseLogger(),
        migrations: ['dist/database/migrations/*.js'],
        migrationsRun: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [
          'dist/modules/**/*.entity.js',
          'dist/modules/**/entities/*.entity.js',
        ],
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
