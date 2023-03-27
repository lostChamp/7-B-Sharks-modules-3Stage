import {BelongsToMany, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Profile} from "../profile/profile.model";

interface TblockCreationAttribute {
    readonly unique_name: string,
    readonly name: string,
    readonly image: string,
    readonly text: string,
    readonly group: string,

}
@Table({tableName: "text_block"})
export class Tblock extends Model<Tblock, TblockCreationAttribute> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    unique_name: string;

    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @Column({type: DataType.STRING, allowNull: true})
    image: string;

    @Column({type: DataType.STRING, allowNull: true})
    text: string;

    @Column({type: DataType.STRING, allowNull: true})
    group: string;
}