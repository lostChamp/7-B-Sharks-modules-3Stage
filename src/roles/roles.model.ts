import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";
import { ApiProperty } from "@nestjs/swagger";

interface RoleCreationAttribute {
    value: string,
    description: string
}
@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttribute> {

    @ApiProperty({example: "1", description: "Уникальный индентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "USER", description: "Роль пользователя"})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    value: string;

    @ApiProperty({example: "Обычный пользователь", description: "Описание роли"})
    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @ApiProperty({description: "Информация о пользователях", type: [UserRoles]})
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}