import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity/users.entity';
import { ExceptionStoreProcedure } from 'src/utils.common/utils.exception.common/utils.store-procedure-exception.common';
import { Pagination } from 'src/utils.common/utils.pagination.common/utils.pagination.common';
import { StoreProcedureResult } from 'src/utils.common/utils.store.proceduce-result.common/utils.store.proceduce-result.common';
import { Repository } from 'typeorm';
import { MaterialsCreateDTO } from './material.query.dto/materials.create.dto';
import { MaterialsParamsDTO } from './material.query.dto/materials.params.dto';
import { MaterialsQueryDTO } from './material.query.dto/materials.query.dto';
import { MaterialsUpdateDTO } from './material.query.dto/materials.update.dto';
import { MaterialInventoryResponse } from './material.response/material.inventory.response';
import { Material } from './materials.entity/material.entity';

@Injectable()
export class MaterialsService {
    constructor(
        @InjectRepository(Material)
        private material: Repository<Material>,
    ) { }


    async spGetListMaterials(
        user: Users,
        materialsQueryDTO: MaterialsQueryDTO
    ): Promise<Material[]> {

        let pagination: Pagination = new Pagination(materialsQueryDTO.page, materialsQueryDTO.limit)

        let materials: Material[] = await this.material.query(
            "CALL sp_get_list_materials(?,?,?,?,?, @status, @message, @totalRecord); SELECT @status AS status, @message AS message, @totalRecord AS total_record",
            [
                user.id,
                materialsQueryDTO.status,
                materialsQueryDTO.key_search,
                pagination.getOffset(),
                pagination.limit,
            ]
        );
        console.log("🚀 ~ file: materials.service.ts ~ line 39 ~ MaterialsService ~ materials", materials)

        ExceptionStoreProcedure.validate(materials);
        let data: Material[] = new StoreProcedureResult<Material[]>().getResultList(materials);
        return data;
    }

    async spGetListMaterialInventory(
        user: Users,
    ): Promise<MaterialInventoryResponse[]> {


        let materials: Material[] = await this.material.query(
            "CALL sp_get_list_material_inventory(?, @status, @message); SELECT @status AS status, @message AS message, @totalRecord AS total_record",
            [
                user.id,
            ]
        );

        ExceptionStoreProcedure.validate(materials);
        let data: MaterialInventoryResponse[] = new StoreProcedureResult<Material[]>().getResultList(materials);
        return data;
    }


    async spCreateMaterials(
        user: Users,
        materialsCreateDTO: MaterialsCreateDTO
    ): Promise<Material> {

        let newMaterial: Material = await this.material.query(
            "CALL sp_create_materials(?,?,?,?,?,?,?,?,?,?, @status, @message); SELECT @status AS status, @message AS message",
            [
                user.id,
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

    async spUpdateMaterials(
        user: Users,
        materialsUpdateDTO: MaterialsUpdateDTO
    ): Promise<Material> {


        let newMaterial: Material = await this.material.query(
            "CALL sp_update_materials(?,?,?,?,?,?,?,?,?,?, @status, @message); SELECT @status AS status, @message AS message",
            [
                user.id,
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
        console.log("🚀 ~ file: materials.service.ts ~ line 101 ~ MaterialsService ~ newMaterial", newMaterial)


        ExceptionStoreProcedure.validateEmptyDetail(newMaterial);
        let data: Material = new StoreProcedureResult<Material>().getResultDetail(newMaterial);
        return data;
    }
}
