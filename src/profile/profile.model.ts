import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

interface ProfileCreationAttribute {
    full_name: string,
    phone_number: string
}
@Table({tableName: "profile"})
export class Profile extends Model<Profile, ProfileCreationAttribute> {

    @ApiProperty({example: "1", description: "Уникальный индентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Konstantin Kondyurin", description: "ФИО пользователя"})
    @Column({type: DataType.STRING, allowNull: true})
    full_name: string;

    @ApiProperty({example: "8800553535", description: "Номер телефона пользователя"})
    @Column({type: DataType.STRING, allowNull: true})
    phone_number: string;

    @ApiProperty({example: "1", description: "id для связи с таблицей где хранится вся важная информация о пользователе"})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number

    @BelongsTo(() => User)
    user: User
}