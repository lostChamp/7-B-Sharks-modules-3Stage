import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Images} from "./save-images.model";
import {CreateSaveImagesDto} from "./dto/create-save-images.dto";
import {FilesService} from "../files/files.service";
import {Op} from "sequelize";
import {EditTblockDto} from "../tblock/dto/edit-block.dto";

@Injectable()
export class SaveImagesService {

    constructor(@InjectModel(Images) private imagesRepository: typeof Images,
                private fileService: FilesService) {}

    async createImage(imageDto: CreateSaveImagesDto, image_file: any) {
        const fileName = await this.fileService.createFile(image_file);
        const image = await this.imagesRepository.create({...imageDto, image_name: fileName});
        return image;
    }

    async deleteImagesByTblockId(tblockId) {
        const images = await this.imagesRepository.destroy({where: {tblock_id: tblockId}});
        return images;
    }

    async deleteImages() {
        const images1 = await this.imagesRepository.destroy({where: {essence_table: "", essence_id: ""}});
        const images2 = await this.imagesRepository.destroy({where: {essence_table: null, essence_id: null}});
        const images3 = await this.imagesRepository.destroy({where: {createdAt:
                    {[Op.lt]: new Date()} //доделать
            }});
        return [images1, images2, images3];
    }

    async editImageByTblockId(tblockId, editTblockDto: EditTblockDto) {
        const image = await this.imagesRepository.update(
            {essence_id: editTblockDto.essence_id, essence_table: editTblockDto.essence_table},
            {where: {tblock_id: tblockId}}
        )
        return image;
    }
}
