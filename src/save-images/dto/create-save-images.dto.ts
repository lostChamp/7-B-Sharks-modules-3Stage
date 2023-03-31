import { ApiProperty } from "@nestjs/swagger";

export class CreateSaveImagesDto {
    @ApiProperty({example: "profile", description: "Таблица в которой используется файл"})
    readonly essence_table: string;

    @ApiProperty({example: "1", description: "Id элемента таблицы в которой используется файл"})
    readonly essence_id: string;

    @ApiProperty({example: "1", description: "Id элемента в таблице Tblock"})
    readonly tblock_id: number;
}