import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Tblock} from "../tblock/tblock.model";
import { ApiProperty } from "@nestjs/swagger";

interface SaveImagesCreationAttribute {
    essence_table: string;
    essence_id: string;
    image_name: string;

}
@Table({tableName: "images"})
export class Images extends Model<Images, SaveImagesCreationAttribute> {

    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "profile", description: "Таблица в которой используется файл"})
    @Column({type: DataType.STRING, allowNull: true})
    essence_table: string;

    @ApiProperty({example: "1", description: "Id элемента таблицы в которой используется файл"})
    @Column({type: DataType.STRING, allowNull: true})
    essence_id: string;

    @ApiProperty({example: "5a32ldfk435.jpg", description: "Название изображения в папке проекта"})
    @Column({type: DataType.STRING})
    image_name: string;

    @ApiProperty({example: "1", description: "id элемента из таблицы текстовых блоков"})
    @ForeignKey(() => Tblock)
    @Column({type: DataType.INTEGER})
    tblock_id: number;

    @BelongsTo(() => Tblock)
    tblock: Tblock
}