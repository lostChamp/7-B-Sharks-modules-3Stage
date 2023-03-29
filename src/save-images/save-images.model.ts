import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Tblock} from "../tblock/tblock.model";

interface SaveImagesCreationAttribute {
    essence_table: string;
    essence_id: string;
    image_name: string;

}
@Table({tableName: "images"})
export class Images extends Model<Images, SaveImagesCreationAttribute> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true})
    essence_table: string;

    @Column({type: DataType.STRING, allowNull: true})
    essence_id: string;

    @Column({type: DataType.STRING})
    image_name: string;

    @ForeignKey(() => Tblock)
    @Column({type: DataType.INTEGER})
    tblock_id: number;

    @BelongsTo(() => Tblock)
    tblock: Tblock
}