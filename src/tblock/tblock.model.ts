import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Images} from "../save-images/save-images.model";
import {ApiProperty} from "@nestjs/swagger";

interface TblockCreationAttribute {
    readonly unique_name: string,
    readonly name: string,
    readonly image: string,
    readonly text: string,
    readonly group: string,

}
@Table({tableName: "text_block"})
export class Tblock extends Model<Tblock, TblockCreationAttribute> {

    @ApiProperty({example: "1", description: "Уникальный индентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "main-hero-block", description: "Уникальное имя для поиска"})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    unique_name: string;

    @ApiProperty({example: "hero", description: "Название блока"})
    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @ApiProperty({example: "/src/img/privet.png", description: "Путь до картинки"})
    @Column({type: DataType.STRING, allowNull: true})
    image: string;

    @ApiProperty({example: "Текст о чем то", description: "Текст для блока"})
    @Column({type: DataType.STRING, allowNull: true})
    text: string;

    @ApiProperty({example: "body", description: "Название группы блоков"})
    @Column({type: DataType.STRING, allowNull: true})
    group: string;

    @ApiProperty({description: "", type: [Images]})
    @HasMany(() => Images)
    images: Images[];
}