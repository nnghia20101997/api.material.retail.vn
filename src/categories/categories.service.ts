import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity/users.entity';
import { ExceptionStoreProcedure } from 'src/utils.common/utils.exception.common/utils.store-procedure-exception.common';
import { StoreProcedureResult } from 'src/utils.common/utils.store.proceduce-result.common/utils.store.proceduce-result.common';
import { Repository } from 'typeorm';
import { CategoriesCreateDTO } from './categories.dto/categories.create.dto';
import { CategoriesParamsDTO } from './categories.dto/categories.params.dto';
import { CategoriesQueryDTO } from './categories.dto/categories.query.dto';
import { CategoriesUpdateDTO } from './categories.dto/categories.update.dto';
import { Categories } from './categories.entity/categories.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories)
        private categories: Repository<Categories>,
    ) { }



    async spCreateCategories(
        user: Users,
        categoriesCreateDTO: CategoriesCreateDTO
    ): Promise<Categories> {

        let newCategories: Categories = await this.categories.query(
            "CALL sp_create_categories(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                user.id,
                categoriesCreateDTO.name,
                categoriesCreateDTO.description
            ]
        )
        ExceptionStoreProcedure.validateEmptyDetail(newCategories);
        let data: Categories = new StoreProcedureResult<Categories>().getResultDetail(newCategories);
        return data;
    }


    async spUpdateCategories(
        user: Users,
        categoriesParamsDTO: CategoriesParamsDTO,
        categoriesUpdateDTO: CategoriesUpdateDTO
    ): Promise<Categories> {

        let categoriesUpdated: Categories = await this.categories.query(
            "CALL sp_update_categories(?,?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                user.id,
                categoriesParamsDTO.id,
                categoriesUpdateDTO.name,
                categoriesUpdateDTO.description
            ]
        )
        console.log("🚀 ~ file: categories.service.ts ~ line 56 ~ CategoriesService ~ categoriesUpdated", categoriesUpdated)
        ExceptionStoreProcedure.validateEmptyDetail(categoriesUpdated);
        let data: Categories = new StoreProcedureResult<Categories>().getResultDetail(categoriesUpdated);
        return data;
    }

    async spGetListCategories(
        user: Users,
        categoriesQueryDTO: CategoriesQueryDTO
    ): Promise<Categories[]> {

        let categories: Categories[] = await this.categories.query(
            "CALL sp_get_list_categories(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                user.id,
                categoriesQueryDTO.status,
                categoriesQueryDTO.key_search
            ]
        )
        ExceptionStoreProcedure.validate(categories);
        let data: Categories[] = new StoreProcedureResult<Categories[]>().getResultList(categories);
        return data;
    }

}
