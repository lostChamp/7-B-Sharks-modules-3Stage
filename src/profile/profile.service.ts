import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private userService: UsersService) {}

    async createProfile(dto: CreateProfileDto, userDto: CreateUserDto) {
        const profile = await this.profileRepository.create(dto);
        const user = await this.userService.getUserByEmail(userDto.mail);
        await profile.update({user_id: user.id});
        return profile;
    }

    async getAllProfile() {
        const profiles = await this.profileRepository.findAll({include: {all: true}});
        return profiles;
    }

}
