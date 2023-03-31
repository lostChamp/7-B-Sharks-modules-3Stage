import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../roles/roles.model";

export class CreateUserDto {
    @ApiProperty({example: "user@mail.ru", description: "Mail пользователя"})
    readonly mail: string;

    @ApiProperty({example: "1234", description: "Пароль пользователя"})
    readonly password: string;
}