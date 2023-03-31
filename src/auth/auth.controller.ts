import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("AUTH")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Авторизация пользоватля"})
    @ApiResponse({status: 200})
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200})
    @Post("/registration")
    registration(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
        return this.authService.registration(userDto, profileDto);
    }

}
