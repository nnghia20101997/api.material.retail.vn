import { Controller, Get, Query, Res, UseGuards, ValidationPipe, Request, Post, Body, Param, HttpCode, HttpStatus, UsePipes, HttpException } from '@nestjs/common';
import { Response } from "express";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/users/users.entity/users.entity';
import { GetUserFromToken } from 'src/utils.common/utils.decorator.common/utils.decorator.common';
import { ExceptionResponseDetail } from 'src/utils.common/utils.exception.common/utils.exception.common';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { MaterialsCreateDTO } from './material.query.dto/materials.create.dto';
import { MaterialsParamsDTO } from './material.query.dto/materials.params.dto';
import { MaterialsQueryDTO } from './material.query.dto/materials.query.dto';
import { MaterialsUpdateDTO } from './material.query.dto/materials.update.dto';
import { MaterialDataModelDetailResponse } from './material.response/material.data.model.detail.response';
import { MaterialDetailResponse } from './material.response/material.detail.response';
import { Material } from './materials.entity/material.entity';
import { MaterialDataModel } from './materials.entity/material.entity.data.model';
import { MaterialsService } from './materials.service';

@Controller('/api/materials')
export class MaterialsController {

    constructor(private materialsService: MaterialsService) {}

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    async create(
        @Body(new ValidationPipe()) materialsCreateDTO: MaterialsCreateDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response,
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();
        let newMaterial: Material = await this.materialsService.spCreateMaterials(user.id, materialsCreateDTO)
        response.setData(new MaterialDetailResponse(newMaterial))
        res.status(HttpStatus.OK).send(response)
    }

    @Post("/:id/update")
    @UseGuards(JwtAuthGuard)
    async update(
        @Param(new ValidationPipe()) materialsParamsDTO: MaterialsParamsDTO,
        @Body(new ValidationPipe()) materialsUpdateDTO: MaterialsUpdateDTO,
        @Res() res: Response,
        @GetUserFromToken() user: Users,
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();
        let material: Material = await this.materialsService.findOne(materialsParamsDTO.id);
        if(!material){
            throw new HttpException(new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, "Nguyên liệu không tồn tại!"), HttpStatus.OK);
        }else{
            let materialUpdated: Material = await this.materialsService.spUpdateMaterials(user.id, materialsUpdateDTO)
            response.setData(new MaterialDetailResponse(materialUpdated))
        }
        return res.status(HttpStatus.OK).send(response);
    }

    @Get("")
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getList(
        @Query(new ValidationPipe()) materialsQueryDTO: MaterialsQueryDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response,
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();
        let materials: MaterialDataModel[] = await this.materialsService.spGetListMaterials(user.id, materialsQueryDTO)
        response.setData(new MaterialDataModelDetailResponse().mapToList(materials))
        res.status(HttpStatus.OK).send(response)
    }
}
