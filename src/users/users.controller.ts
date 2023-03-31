import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import {ProfileService} from "../profile/profile.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";

@ApiTags("USERS")
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService,
              private profileService: ProfileService,
              private authService: AuthService,
              private jwtService: JwtService) {}

  @ApiOperation({summary: "Создание пользователя и профиля"})
  @ApiResponse({status: 200, type: User})
  @Post()
  createUser(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
    const user = this.userService.createUser(userDto, profileDto);
    return user;
  }
  @ApiOperation({summary: "Получение пользователей со всей информацией о них (АДМИН)"})
  @ApiResponse({status: 200, type: [User]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary: "Удаление пользователя по id (АДМИН)"})
  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete("/delete/:id")
  deleteUserById(@Param("id") user_id: number) {
    return this.userService.deleteUserById(user_id);
  }
  @ApiOperation({summary: "Редактирование пользователя по id (АДМИН)"})
  @ApiResponse({status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put("/edit/:id")
  editProfileById(@Param("id") user_id: number, @Body() profileDto: CreateProfileDto) {
    return this.profileService.editProfileByUserId(user_id, profileDto);
  }

  @ApiOperation({summary: "Редактирование профиля пользователем"})
  @ApiResponse({status: 200})
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Put("/edit")
  editProfile(@Req() req: Request, @Body() profileDto: CreateProfileDto) {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const user = this.jwtService.verify(token);
    return this.profileService.editProfileByUserId(user.id, profileDto);
  }

  @ApiOperation({summary: "Удаление аккаунта"})
  @ApiResponse({status: 200})
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Delete("/delete")
  deleteProfile(@Req() req: Request) {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const user = this.jwtService.verify(token);
    return  this.userService.deleteUserById(user.id);
  }

}
