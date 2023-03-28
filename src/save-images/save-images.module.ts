import { Module } from '@nestjs/common';
import { SaveImagesService } from './save-images.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Images} from "./save-images.model";
import {FilesModule} from "../files/files.module";
import {FilesService} from "../files/files.service";
import { SaveImagesController } from './save-images.controller';
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [SaveImagesService, FilesService],
  imports: [SequelizeModule.forFeature([Images]), FilesModule, AuthModule],
  exports: [SaveImagesService],
  controllers: [SaveImagesController]
})
export class SaveImagesModule {}
