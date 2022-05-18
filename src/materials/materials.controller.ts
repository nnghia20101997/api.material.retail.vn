import { Controller, Get, Query, Res, UseGuards, ValidationPipe, Request, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { response, Response } from "express";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/users/users.entity/users.entity';
import { GetUserFromToken } from 'src/utils.common/utils.decorator.common/utils.decorator.common';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { MaterialsCreateDTO } from './material.query.dto/materials.create.dto';
import { MaterialsParamsDTO } from './material.query.dto/materials.params.dto';
import { MaterialsQueryDTO } from './material.query.dto/materials.query.dto';
import { MaterialsUpdateDTO } from './material.query.dto/materials.update.dto';
import { MaterialDetailResponse } from './material.response/material.detail.response';
import { MaterialInventoryResponse } from './material.response/material.inventory.response';
import { Materials } from './materials.entity/material.entity';
import { MaterialsService } from './materials.service';

@Controller('/api/materials')
export class MaterialsController {

    constructor(private materialsService: MaterialsService) {

    }

    @Get("")
    @UseGuards(JwtAuthGuard)
    async getList(
        @Query(new ValidationPipe()) materialsQueryDTO: MaterialsQueryDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response,
    ): Promise<any> {

        let response: BaseResponseData = new BaseResponseData();

        let materials: Materials[] = await this.materialsService.spGetListMaterials(user, materialsQueryDTO)

        response.setData(new MaterialDetailResponse().mapToList(materials))

        res.status(HttpStatus.OK).send(response)
    }

    @Get("/list-material-inventory")
    @UseGuards(JwtAuthGuard)
    async getListInVentory(
        @GetUserFromToken() user: Users,
        @Res() res: Response,
    ): Promise<any> {

        let response: BaseResponseData = new BaseResponseData();

        let materialInventory: MaterialInventoryResponse[] = await this.materialsService.spGetListMaterialInventory(user)

        response.setData(new MaterialInventoryResponse().mapToList(materialInventory))

        res.status(HttpStatus.OK).send(response)
    }

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    async create(
        @Body(new ValidationPipe()) materialsCreateDTO: MaterialsCreateDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response,
    ): Promise<any> {

        let response: BaseResponseData = new BaseResponseData();

        let newMaterial: Materials = await this.materialsService.spCreateMaterials(user, materialsCreateDTO)

        response.setData(new MaterialDetailResponse(newMaterial))

        res.status(HttpStatus.OK).send(response)
    }


    @Post("/:id")
    @UseGuards(JwtAuthGuard)
    async update(
        @Param(new ValidationPipe()) materialsParamsDTO: MaterialsParamsDTO,
        @Body(new ValidationPipe()) materialsUpdateDTO: MaterialsUpdateDTO,
        @Res() res: Response,
        @GetUserFromToken() user: Users,
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();

        let materialUpdated: Materials = await this.materialsService.spCreateMaterials(user, materialsUpdateDTO)

        response.setData(new MaterialDetailResponse(materialUpdated))

        return res.status(HttpStatus.OK).send(response);
    }




}
