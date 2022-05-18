import { Controller, Post, Res, UseGuards, Request, HttpStatus, Get, ValidationPipe, Body, Param, Query } from '@nestjs/common';
import { response, Response } from "express";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from 'src/users/users.entity/users.entity';
import { GetUserFromToken } from 'src/utils.common/utils.decorator.common/utils.decorator.common';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { CategoriesCreateDTO } from './categories.dto/categories.create.dto';
import { CategoriesParamsDTO } from './categories.dto/categories.params.dto';
import { CategoriesQueryDTO } from './categories.dto/categories.query.dto';
import { CategoriesUpdateStatusDTO } from './categories.dto/categories.update-status.dto';
import { CategoriesUpdateDTO } from './categories.dto/categories.update.dto';
import { Categories } from './categories.entity/categories.entity';
import { CategoriesDetailResponse } from './categories.reponse/categories.detail.response';
import { CategoriesService } from './categories.service';

@Controller('/api/categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Post("/create")
    @UseGuards(JwtAuthGuard)
    async create(
        @Body(new ValidationPipe()) categoriesCreateDTO: CategoriesCreateDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response,
        @Request() req
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();

        let newCategories: Categories = await this.categoriesService.spCreateCategories(user, categoriesCreateDTO)

        response.setData(new CategoriesDetailResponse(newCategories))

        return res.status(HttpStatus.OK).send(response);
    }

    @Post("/:id")
    @UseGuards(JwtAuthGuard)
    async update(
        @Param(new ValidationPipe()) categoriesParamsDTO: CategoriesParamsDTO,
        @Body(new ValidationPipe()) categoriesUpdateDTO: CategoriesUpdateDTO,
        @GetUserFromToken() user: Users,
        @Res() res: Response,
        @Request() req
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();

        let categoriesUpdated: Categories = await this.categoriesService.spUpdateCategories(user, categoriesParamsDTO, categoriesUpdateDTO)

        response.setData(new CategoriesDetailResponse(categoriesUpdated))

        return res.status(HttpStatus.OK).send(response);
    }

    @Post("/update-status")
    @UseGuards(JwtAuthGuard)
    async updateStatus(
        @Body(new ValidationPipe()) categoriesUpdateStatusDTO: CategoriesUpdateStatusDTO,
        @Res() res: Response,
        @GetUserFromToken() user: Users,
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();

        // call store update status categories

        return res.status(HttpStatus.OK).send(response);
    }

    @Get("")
    @UseGuards(JwtAuthGuard)
    async getList(
        @Query(new ValidationPipe()) categoriesQueryDTO: CategoriesQueryDTO,
        @Res() res: Response,
        @GetUserFromToken() user: Users,
    ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();

        let categories: Categories[] = await this.categoriesService.spGetListCategories(user, categoriesQueryDTO)

        response.setData(new CategoriesDetailResponse().mapToList(categories))

        res.status(HttpStatus.OK).send(response)
    }
}
