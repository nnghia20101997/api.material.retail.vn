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

    /**
     * 
     * @param id 
     * @returns Categories
     */
    async findOne(
        id: number
    ): Promise<Categories> {
       let  category: Categories = await this.categories.findOne(id);
        return category;
    }

    /**
     * 
     * @param category 
     * @returns Categories
     */
    async update(
        category: Categories
    ): Promise<Categories> {
      return  await this.categories.save(category);
    }


    /**
     * 
     * @param userId 
     * @param categoriesCreateDTO 
     * @returns Categories
     */
    async spCreateCategories(
        userId: number,
        categoriesCreateDTO: CategoriesCreateDTO
    ): Promise<Categories> {

        let newCategories: Categories = await this.categories.query(
            "CALL sp_create_categories(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                userId,
                categoriesCreateDTO.name,
                categoriesCreateDTO.description
            ]
        )
        ExceptionStoreProcedure.validateEmptyDetail(newCategories);
        let data: Categories = new StoreProcedureResult<Categories>().getResultDetail(newCategories);
        return data;
    }


    /**
     * 
     * @param userId 
     * @param categoriesParamsDTO 
     * @param categoriesUpdateDTO 
     * @returns Categories
     */
    async spUpdateCategories(
        userId: number,
        categoriesParamsDTO: CategoriesParamsDTO,
        categoriesUpdateDTO: CategoriesUpdateDTO
    ): Promise<Categories> {

        let categoriesUpdated: Categories = await this.categories.query(
            "CALL sp_update_categories(?,?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                userId,
                categoriesParamsDTO.id,
                categoriesUpdateDTO.name,
                categoriesUpdateDTO.description
            ]
        )

        ExceptionStoreProcedure.validateEmptyDetail(categoriesUpdated);
        let data: Categories = new StoreProcedureResult<Categories>().getResultDetail(categoriesUpdated);
        return data;
    }

    /**
     * 
     * @param user 
     * @param categoriesQueryDTO 
     * @returns Categories[]
     */
    async spGetListCategories(
        userId: number,
        categoriesQueryDTO: CategoriesQueryDTO
    ): Promise<Categories[]> {

        let categories: Categories[] = await this.categories.query(
            "CALL sp_get_list_categories(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                userId,
                categoriesQueryDTO.status,
                categoriesQueryDTO.key_search
            ]
        )
        ExceptionStoreProcedure.validate(categories);
        let data: Categories[] = new StoreProcedureResult<Categories[]>().getResultList(categories);
        return data;
    }

}
