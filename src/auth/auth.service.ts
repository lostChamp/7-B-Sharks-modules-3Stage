import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }


    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.mail);
        if(candidate) {
            throw new HttpException("Пользователь с таким mail не найден", HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user) {
        const payload = {mail: user.mail, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.mail);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: "Неверный логин/пароль"});
    }

}
