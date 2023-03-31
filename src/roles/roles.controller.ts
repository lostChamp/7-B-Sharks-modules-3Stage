import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Tblock } from "../tblock/tblock.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@ApiTags("ROLES")
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService,
                private authService: AuthService,
                private jwtService: JwtService) {}

    @ApiOperation({summary: "Создание роли (АДМИН)"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: "Получение роли по значению (АДМИН)"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/:value")
    getByValue(@Param("value") value: string) {
        return this.roleService.getRoleByValue(value);
    }


}
