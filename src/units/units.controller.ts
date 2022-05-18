import { Controller, Res, Request, UseGuards, Post, Get, HttpStatus, ValidationPipe, Body, Param, Query, UsePipes } from '@nestjs/common';
import { Response } from "express";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/users/users.entity/users.entity';
import { GetUserFromToken } from 'src/utils.common/utils.decorator.common/utils.decorator.common';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { UnitsCreateDTO } from './units.dto/units.create.dto';
import { UnitsParamsDTO } from './units.dto/units.params.dto';
import { UnitsQueryDTO } from './units.dto/units.query.dto';
import { UnitsUpdateStatusDTO } from './units.dto/units.update-status.dto';
import { UnitsUpdateDTO } from './units.dto/units.update.dto';
import { Unit } from './units.entity/units.entity';
import { UnitsDetailResponse } from './units.response/units.detail.response';
import { UnitsService } from './units.service';

@Controller('/api/units')
export class UnitsController {
    constructor(private unitsService: UnitsService) { }

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    async create(
        @Body(new ValidationPipe()) unitsCreateDTO: UnitsCreateDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();
        let newUnits: Unit = await this.unitsService.spCreateUnit(user.id, unitsCreateDTO)
        response.setData(new UnitsDetailResponse(newUnits));
        res.status(HttpStatus.OK).send(response)
    }



    @Post("/:id/update")
    @UseGuards(JwtAuthGuard)
    async update(
        @Param(new ValidationPipe()) unitsParamsDTO: UnitsParamsDTO,
        @Body(new ValidationPipe()) unitsUpdateDTO: UnitsUpdateDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();
        let unitsUpdated: Unit = await this.unitsService.spUpdateUnit(user.id, unitsParamsDTO, unitsUpdateDTO);
        response.setData(unitsUpdated);
        res.status(HttpStatus.OK).send(response)
    }



    @Get("")
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getList(
        @Query(new ValidationPipe()) unitsQueryDTO: UnitsQueryDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();
        let units: Unit[] = await this.unitsService.spGetListUnits(user.id, unitsQueryDTO);
        response.setData(new UnitsDetailResponse().mapToList(units))
        res.status(HttpStatus.OK).send(response);
    }

    @Post("/:id/change-status")
    @UseGuards(JwtAuthGuard)
    async updateStatus(
        @Param(new ValidationPipe()) unitsParamsDTO: UnitsParamsDTO,
        @Body(new ValidationPipe()) unitsUpdateStatusDTO: UnitsUpdateStatusDTO,
        @Res() res: Response
    ): Promise<any> {

        let response: BaseResponseData = new BaseResponseData();
        // call store create units
        res.status(HttpStatus.OK).send(response)
    }
}
