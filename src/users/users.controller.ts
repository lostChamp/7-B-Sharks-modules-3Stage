import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {ProfileService} from "../profile/profile.service";
import {JwtAuthGuard} from "../auth/jwt-auth-guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService,
              private profileService: ProfileService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
    const user = this.userService.createUser(userDto, profileDto);
    return user;
  }
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/delete/:id")
  deleteUserById(@Param("id") user_id: number) {
    return  this.userService.deleteUserById(user_id);
  }
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/edit")
  editProfileByMail(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
    return this.profileService.editProfileByUserMail(userDto, profileDto);
  }



}
