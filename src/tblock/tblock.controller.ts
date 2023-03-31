import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TblockService} from "./tblock.service";
import {CreateTblockDto} from "./dto/create-tblock.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "../auth/auth.service";
import {CreateSaveImagesDto} from "../save-images/dto/create-save-images.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {SaveImagesService} from "../save-images/save-images.service";
import {EditTblockDto} from "./dto/edit-block.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Tblock} from "./tblock.model";

@ApiTags("TBLOCK")
@Controller('tblock')
export class TblockController {

    constructor(private tblockService: TblockService,
                private jwtService: JwtService,
                private authService: AuthService,
                private saveImagesService: SaveImagesService) {}

    @ApiOperation({summary: "Создание Tblock'a (АДМИН)"})
    @ApiResponse({status: 200, type: Tblock})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor("image"))
    createTblock(@Body() tblockDto: CreateTblockDto, @Body() imageDto: CreateSaveImagesDto, @UploadedFile() image) {
        const user = this.tblockService.createTblock(tblockDto, imageDto, image);
        return user;
    }
    @ApiOperation({summary: "Получение всех Tblock'ов (АДМИН)"})
    @ApiResponse({status: 200, type: Tblock})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllTBlocks() {
        const tblocks = this.tblockService.getAllTblocks();
        return tblocks;
    }

    @ApiOperation({summary: "Получение Tblock'ов по группе (АДМИН)"})
    @ApiResponse({status: 200, type: Tblock})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/bygroup/:group")
    getTblocksByGroup(@Param("group") group_name: string) {
        const tblocks = this.tblockService.getTblocksByGroup(group_name);
        return tblocks;
    }

    @ApiOperation({summary: "Получение Tblock'ов по уникальному имени (АДМИН)"})
    @ApiResponse({status: 200, type: Tblock})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/byunique/:unique")
    getTblockByUniqueName(@Param("unique") unique: string) {
        const tblock = this.tblockService.getTblockByUniqueName(unique);
        return tblock;
    }

    @ApiOperation({summary: "Редактирование Tblock'ов по id (АДМИН)"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put("/:id")
    editTblockById(@Param("id") tblock_id: string, @Body() editTblockDto: EditTblockDto) {
        const tblock = this.tblockService.editTblockById(tblock_id, editTblockDto);
        const image = this.saveImagesService.editImageByTblockId(tblock_id, editTblockDto)
        return [tblock, image];
    }

    @ApiOperation({summary: "Удаление Tblock'ов по id (АДМИН)"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    deleteTblockById(@Param("id") tblock_id: string) {
        const images = this.saveImagesService.deleteImagesByTblockId(tblock_id);
        const tblock = this.tblockService.deleteTblockById(tblock_id);
        return [tblock, images];
    }

}
