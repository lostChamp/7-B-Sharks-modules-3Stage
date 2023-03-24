import {forwardRef, Module} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Profile} from "./profile.model";
import { ProfileController } from './profile.controller';
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";
import {RolesService} from "../roles/roles.service";
import {RolesModule} from "../roles/roles.module";
import {Role} from "../roles/roles.model";

@Module({
  providers: [ProfileService, UsersService, RolesService],
  controllers: [ProfileController],
  imports: [
      SequelizeModule.forFeature([User, Profile, Role]),
      forwardRef(() => UsersModule),
      RolesModule
  ],
  exports: [
      ProfileService
  ]
})
export class ProfileModule {}
