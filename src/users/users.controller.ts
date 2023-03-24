import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {ProfileService} from "../profile/profile.service";

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService,
              private profileService: ProfileService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
    const user = this.userService.createUser(userDto);
    this.profileService.createProfile(profileDto, userDto);
    return user;
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

}
