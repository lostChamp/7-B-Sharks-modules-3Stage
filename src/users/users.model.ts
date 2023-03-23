import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UserCreationAttribute {
    mail: string,
    password: string
}
@Table({tableName: "user"})
export class User extends Model<User, UserCreationAttribute> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    mail: string;

    @Column({type: DataType.STRING, allowNull: true})
    password: string;

}