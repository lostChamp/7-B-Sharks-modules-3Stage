import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Tblock} from "./tblock.model";
import {CreateTblockDto} from "./dto/create-tblock.dto";

@Injectable()
export class TblockService {

    constructor(@InjectModel(Tblock) private tblockRepository: typeof Tblock) {}

    async createTblock(tblockDto: CreateTblockDto) {
        const tblock = await this.tblockRepository.create(tblockDto);
        return tblock;
    }

    async getAllTblocks() {
        const tblocks = await this.tblockRepository.findAll({include: {all: true}});
        return tblocks;
    }

    async getTblocksByGroup(group_name: string) {
        const tblocks = await this.tblockRepository.findAll({where: {group: group_name}});
        return tblocks;
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
