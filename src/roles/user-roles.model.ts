import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName: "user_roles", createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: "3", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "2", description: "id роли"})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    role_id: number;

    @ApiProperty({example: "1", description: "id пользователя"})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;
}