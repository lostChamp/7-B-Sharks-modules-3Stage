import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Tblock} from "./tblock.model";
import {CreateTblockDto} from "./dto/create-tblock.dto";
import {SaveImagesService} from "../save-images/save-images.service";
import {CreateSaveImagesDto} from "../save-images/dto/create-save-images.dto";

@Injectable()
export class TblockService {

    constructor(@InjectModel(Tblock) private tblockRepository: typeof Tblock,
                private imageService: SaveImagesService) {}

    async createTblock(tblockDto: CreateTblockDto, imageDto: CreateSaveImagesDto, image_file: any) {
        const tblock = await this.tblockRepository.create(tblockDto);
        const image = await this.imageService.createImage(imageDto, image_file);
        return [tblock, image];
    }

    async getAllTblocks() {
        const tblocks = await this.tblockRepository.findAll({include: {all: true}});
        return tblocks;
    }

    async getTblocksByGroup(group_name: string) {
        const tblocks = await this.tblockRepository.findAll({where: {group: group_name}, include: {all: true}});
        return tblocks;
    }

    async getTblockByUniqueName(unique_name: string) {
        const tblock = await this.tblockRepository.findOne({where: {unique_name}, include: {all: true}});
        return tblock;
    }

    async deleteTblockById(tblock_id: string) {
        const tblock = await this.tblockRepository.destroy({where: {id: tblock_id}});
        return tblock;
    }

    async editTblockById(tblock_id: string, tblockDto: CreateTblockDto) {
        const tblock = await this.tblockRepository.update(
             {unique_name: tblockDto.unique_name, name: tblockDto.name, image: tblockDto.image, text: tblockDto.text, group: tblockDto.group},
            {where: {id: tblock_id}}
        );
        return tblock;
    }

}
