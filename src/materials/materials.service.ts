import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionStoreProcedure } from 'src/utils.common/utils.exception.common/utils.store-procedure-exception.common';
import { Pagination } from 'src/utils.common/utils.pagination.common/utils.pagination.common';
import { StoreProcedureResult } from 'src/utils.common/utils.store.proceduce-result.common/utils.store.proceduce-result.common';
import { Repository } from 'typeorm';
import { MaterialsCreateDTO } from './material.query.dto/materials.create.dto';
import { MaterialsQueryDTO } from './material.query.dto/materials.query.dto';
import { MaterialsUpdateDTO } from './material.query.dto/materials.update.dto';
import { Material } from './materials.entity/material.entity';
import { MaterialDataModel } from './materials.entity/material.entity.data.model';

@Injectable()
export class MaterialsService {
    constructor(
        @InjectRepository(Material)
        private material: Repository<Material>,
    ) { }


    async findOne(
        id: number
    ): Promise<Material> {
        return await this.material.findOne(id);
    }

    async spCreateMaterials(
        userId: number,
        materialsCreateDTO: MaterialsCreateDTO
    ): Promise<Material> {

        let newMaterial: Material = await this.material.query(
            "CALL sp_create_materials(?,?,?,?,?,?,?,?,?,?, @status, @message); SELECT @status AS status, @message AS message",
            [
                userId,
                materialsCreateDTO.name,
                materialsCreateDTO.avatar,
                materialsCreateDTO.avatar_thumb,
                materialsCreateDTO.category_id,
                materialsCreateDTO.unit_id,
                materialsCreateDTO.wastage_rate,
                materialsCreateDTO.out_stock_alert_quantity,
                materialsCreateDTO.cost_price,
                materialsCreateDTO.retail_price,

            ]
        )
        ExceptionStoreProcedure.validateEmptyDetail(newMaterial);
        let data: Material = new StoreProcedureResult<Material>().getResultDetail(newMaterial);
        return data;
    }

    async spGetListMaterials(
        userId: number,
        materialsQueryDTO: MaterialsQueryDTO
    ): Promise<MaterialDataModel[]> {
        let pagination: Pagination = new Pagination(materialsQueryDTO.page, materialsQueryDTO.limit)
        let materials: Material[] = await this.material.query(
            "CALL sp_get_list_materials(?,?,?,?,?, @status, @message, @totalRecord); SELECT @status AS status, @message AS message, @totalRecord AS total_record",
            [
                userId,
                materialsQueryDTO.status,
                materialsQueryDTO.key_search,
                pagination.getOffset(),
                pagination.limit,
            ]
        );



        ExceptionStoreProcedure.validate(materials);
        let data: MaterialDataModel[] = new StoreProcedureResult<MaterialDataModel[]>().getResultList(materials);
        return data;
    }

    async spUpdateMaterials(
        userId: number,
        materialsUpdateDTO: MaterialsUpdateDTO
    ): Promise<Material> {

        let newMaterial: Material = await this.material.query(
            "CALL sp_update_materials(?,?,?,?,?,?,?,?,?,?, @status, @message); SELECT @status AS status, @message AS message",
            [
                userId,
                materialsUpdateDTO.name,
                materialsUpdateDTO.avatar,
                materialsUpdateDTO.avatar_thumb,
                materialsUpdateDTO.category_id,
                materialsUpdateDTO.unit_id,
                materialsUpdateDTO.wastage_rate,
                materialsUpdateDTO.out_stock_alert_quantity,
                materialsUpdateDTO.cost_price,
                materialsUpdateDTO.retail_price
            ]
        )

        ExceptionStoreProcedure.validateEmptyDetail(newMaterial);
        let data: Material = new StoreProcedureResult<Material>().getResultDetail(newMaterial);
        return data;
    }
}
