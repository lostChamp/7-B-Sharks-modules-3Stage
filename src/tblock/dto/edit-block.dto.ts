import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class EditTblockDto {
    @ApiProperty({example: "main-hero-block", description: "Уникальное название для поиска"})
    readonly unique_name: string;

    @ApiProperty({example: "hero", description: "Название блока"})
    readonly name: string;

    @ApiProperty({example: "/src/img/privet.png", description: "Путь до картинки"})
    readonly image: string;

    @ApiProperty({example: "Текст о чем то", description: "Текст для блока"})
    readonly text: string;

    @ApiProperty({example: "body", description: "Название группы блоков"})
    readonly group: string;

    @ApiProperty({example: "profile", description: "Название таблицы где будет использоваться файлы (ОПЦИПОНАЛЬНО)"})
    @IsOptional()
    readonly essence_table: string;

    @ApiProperty({example: "1", description: "ID элемента из essence_table (ОПЦИОНАЛЬНО)"})
    @IsOptional()
    readonly essence_id: string;
}