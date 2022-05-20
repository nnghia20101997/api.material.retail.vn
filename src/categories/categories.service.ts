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
import { Category } from './categories.entity/categories.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categories: Repository<Category>,
    ) { }

    /**
     * 
     * @param id 
     * @returns Categories
     */
    async findOne(
        id: number
    ): Promise<Category> {
       let  category: Category = await this.categories.findOne(id);
        return category;
    }

    /**
     * 
     * @param category 
     * @returns Categories
     */
    async update(
        category: Category
    ): Promise<Category> {
      return  await this.categories.save(category);
    }


    /**
     * 
     * @param userId 
     * @param categoriesCreateDTO 
     * @returns Categories
     */
    async spCreateCategory(
        userId: number,
        categoriesCreateDTO: CategoriesCreateDTO
    ): Promise<Category> {

        let newCategories: Category = await this.categories.query(
            "CALL sp_create_category(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                userId,
                categoriesCreateDTO.name,
                categoriesCreateDTO.description
            ]
        )
        ExceptionStoreProcedure.validateEmptyDetail(newCategories);
        let data: Category = new StoreProcedureResult<Category>().getResultDetail(newCategories);
        return data;
    }


    /**
     * 
     * @param userId 
     * @param categoriesParamsDTO 
     * @param categoriesUpdateDTO 
     * @returns Categories
     */
    async spUpdateCategory(
        userId: number,
        categoriesParamsDTO: CategoriesParamsDTO,
        categoriesUpdateDTO: CategoriesUpdateDTO
    ): Promise<Category> {

        let categoriesUpdated: Category = await this.categories.query(
            "CALL sp_update_category(?,?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                userId,
                categoriesParamsDTO.id,
                categoriesUpdateDTO.name,
                categoriesUpdateDTO.description
            ]
        )

        ExceptionStoreProcedure.validateEmptyDetail(categoriesUpdated);
        let data: Category = new StoreProcedureResult<Category>().getResultDetail(categoriesUpdated);
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
    ): Promise<Category[]> {

        let categories: Category[] = await this.categories.query(
            "CALL sp_get_list_categories(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                userId,
                categoriesQueryDTO.status,
                categoriesQueryDTO.key_search
            ]
        )
        ExceptionStoreProcedure.validate(categories);
        let data: Category[] = new StoreProcedureResult<Category[]>().getResultList(categories);
        return data;
    }

}
