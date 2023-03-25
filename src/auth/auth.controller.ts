import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post("/registration")
    registration(@Body() userDto: CreateUserDto, @Body() profileDto: CreateProfileDto) {
        return this.authService.registration(userDto, profileDto);
    }

}
