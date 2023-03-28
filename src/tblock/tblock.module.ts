import { Module } from '@nestjs/common';
import { TblockController } from './tblock.controller';
import { TblockService } from './tblock.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Tblock} from "./tblock.model";
import {AuthModule} from "../auth/auth.module";
import {SaveImagesService} from "../save-images/save-images.service";
import {FilesModule} from "../files/files.module";
import {SaveImagesModule} from "../save-images/save-images.module";
import {FilesService} from "../files/files.service";
import {Images} from "../save-images/save-images.model";

@Module({
  controllers: [TblockController],
  providers: [TblockService, SaveImagesService, FilesService],
  imports: [
    SequelizeModule.forFeature([Tblock, Images]),
    AuthModule,
    SaveImagesModule,
    FilesModule
  ]
})
export class TblockModule {}
