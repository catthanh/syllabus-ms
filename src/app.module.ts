import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import configurationSchema from './config/configuration.schema';
import { DatabaseModule } from './database/database.module';
import { ReferenceMaterialsModule } from './modules/reference-materials/reference-materials.module';
import { SyllabusesModule } from './modules/syllabuses/syllabuses.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { CoursesModule } from './modules/courses/courses.module';
import { CaslModule } from './modules/casl/casl.module';
import { MeetingNotesModule } from './modules/meeting-notes/meeting-notes.module';
import { ProgramModule } from './modules/programs/programs.module';
import { MajorsModule } from './modules/majors/majors.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
      }`,
      validationSchema: configurationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    SyllabusesModule,
    ReferenceMaterialsModule,
    DepartmentsModule,
    CoursesModule,
    CaslModule,
    MeetingNotesModule,
    ProgramModule,
    MajorsModule,
    MeetingNotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
