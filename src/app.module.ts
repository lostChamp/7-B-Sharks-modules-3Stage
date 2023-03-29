import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import {Profile} from "./profile/profile.model";
import { TblockModule } from './tblock/tblock.module';
import { SaveImagesModule } from './save-images/save-images.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {Tblock} from "./tblock/tblock.model";
import {Images} from "./save-images/save-images.model";


@Module({
  imports: [
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, "static")
      }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Profile, Tblock, Images],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProfileModule,
    TblockModule,
    SaveImagesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
