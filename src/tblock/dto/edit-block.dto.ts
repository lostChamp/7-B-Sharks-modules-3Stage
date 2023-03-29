import {IsOptional} from "class-validator";

export class EditTblockDto {
    readonly unique_name: string;
    readonly name: string;
    readonly image: string;
    readonly text: string;
    readonly group: string;

    @IsOptional()
    readonly essence_table: string;

    @IsOptional()
    readonly essence_id: string;
}