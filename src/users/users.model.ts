import {BelongsToMany, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Profile} from "../profile/profile.model";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttribute {
    mail: string,
    password: string
}
@Table({tableName: "user"})
export class User extends Model<User, UserCreationAttribute> {

    @ApiProperty({example: "1", description: "Уникальный индентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "user@mail.ru", description: "Mail пользователя"})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    mail: string;

    @ApiProperty({example: "1234", description: "Пароль пользователя"})
    @Column({type: DataType.STRING, allowNull: true})
    password: string;

    @ApiProperty({description: "Вся информация о профиле", type: Profile})
    @HasOne(() => Profile)
    profile: Profile;

    @ApiProperty({description: "Информация о ролях", type: [Role]})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}