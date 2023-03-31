import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";
import { AuthModule } from "../auth/auth.module";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRoles]),
        AuthModule
    ],
    exports: [
        RolesService
    ]
})
export class RolesModule {}
