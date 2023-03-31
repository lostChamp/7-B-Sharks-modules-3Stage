import {Controller, Delete, UseGuards} from '@nestjs/common';
import {SaveImagesService} from "./save-images.service";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "../auth/auth.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("SAVE-IMAGES")
@Controller('save-images')
export class SaveImagesController {

    constructor(private imageService: SaveImagesService,
                private jwtService: JwtService,
                private authService: AuthService) {}

    @ApiOperation({summary: "Удаление неиспользуемых или старых файлов"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete()
    deleteImages() {
        const images = this.imageService.deleteImages();
        return images;
    }

}
