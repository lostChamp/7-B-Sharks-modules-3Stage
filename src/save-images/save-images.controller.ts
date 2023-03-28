import {Controller, Delete, Param, UseGuards} from '@nestjs/common';
import {SaveImagesService} from "./save-images.service";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "../auth/auth.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('save-images')
export class SaveImagesController {

    constructor(private imageService: SaveImagesService,
                private jwtService: JwtService,
                private authService: AuthService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete()
    deleteImages() {
        const images = this.imageService.deleteImages();
        return images;
    }

}
