import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {Profile} from "../profile/profile.model";
import {ProfileModule} from "../profile/profile.module";
import {ProfileService} from "../profile/profile.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService, ProfileService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
      RolesModule,
      forwardRef(() => ProfileModule),
      forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
