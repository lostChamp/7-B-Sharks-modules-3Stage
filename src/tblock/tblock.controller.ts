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

@Controller('tblock')
export class TblockController {

    constructor(private tblockService: TblockService,
                private jwtService: JwtService,
                private authService: AuthService,
                private saveImagesService: SaveImagesService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor("image"))
    createTblock(@Body() tblockDto: CreateTblockDto, @Body() imageDto: CreateSaveImagesDto, @UploadedFile() image) {
        const user = this.tblockService.createTblock(tblockDto, imageDto, image);
        return user;
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllTBlocks() {
        const tblocks = this.tblockService.getAllTblocks();
        return tblocks;
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/bygroup/:group")
    getTblocksByGroup(@Param("group") group_name: string) {
        const tblocks = this.tblockService.getTblocksByGroup(group_name);
        return tblocks;
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/byunique/:unique")
    getTblockByUniqueName(@Param("unique") unique: string) {
        const tblock = this.tblockService.getTblockByUniqueName(unique);
        return tblock;
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put("/:id")
    editTblockById(@Param("id") tblock_id: string, @Body() tblockDto: CreateTblockDto) {
        const tblock = this.tblockService.editTblockById(tblock_id, tblockDto);
        return tblock;
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    deleteTblockById(@Param("id") tblock_id: string) {
        const images = this.saveImagesService.deleteImagesByTblockId(tblock_id);
        const tblock = this.tblockService.deleteTblockById(tblock_id);
        return [tblock, images];
    }

}
