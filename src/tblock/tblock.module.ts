import { Module } from '@nestjs/common';
import { TblockController } from './tblock.controller';
import { TblockService } from './tblock.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Tblock} from "./tblock.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [TblockController],
  providers: [TblockService],
  imports: [
    SequelizeModule.forFeature([Tblock]),
    AuthModule
  ]
})
export class TblockModule {}
