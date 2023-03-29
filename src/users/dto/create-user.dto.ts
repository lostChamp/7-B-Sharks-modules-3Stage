import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    readonly mail: string;
    readonly password: string;
}