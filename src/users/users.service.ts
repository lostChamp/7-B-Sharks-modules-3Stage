import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {ProfileService} from "../profile/profile.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {where} from "sequelize";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                @Inject(forwardRef(() => ProfileService))
                private profileService: ProfileService) {}

    async createUser(dtoUser: CreateUserDto, dtoProfile: CreateProfileDto) {
      const user = await this.userRepository.create(dtoUser);
      const profile = await this.profileService.createProfile(dtoProfile, dtoUser);
      const role = await this.roleService.getRoleByValue("USER");
      await user.$set("roles", [role.id]);
      user.roles = [role];
      user.profile = profile;
      return user;
    }

    async getAllUsers() {
       const users = await this.userRepository.findAll({include: {all: true}});
       return users;
    }

    async getUserByEmail(mail: string) {
        const user = await this.userRepository.findOne({where: {mail}, include: {all: true}});
        return user;
    }

    async deleteUserById(userId: number) {
        const id = String(userId);
        const user = await this.userRepository.destroy({where: {id}});
        return user;
    }

}
