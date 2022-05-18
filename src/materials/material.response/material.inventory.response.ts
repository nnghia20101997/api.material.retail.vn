import { Material } from "../materials.entity/material.entity";
import { UtilsDate } from "src/utils.common/utils.format-time.common/utils.format-time.common";

export class MaterialInventoryResponse {

    material_id: number;

    material_name: string;

    total_quantity_import: number;

    total_quantity_export: number;

    total_quantity_return: number;

    total_quantity_remove: number;

    total_quantity_inventory: number;



    constructor(materialInventory?: MaterialInventoryResponse) {
        this.material_id = materialInventory ? +materialInventory.material_id : 0;
        this.material_name = materialInventory ? materialInventory.material_name : "";
        this.total_quantity_import = materialInventory ? +materialInventory.total_quantity_import : 0;
        this.total_quantity_export = materialInventory ? +materialInventory.total_quantity_export : 0;
        this.total_quantity_return = materialInventory ? +materialInventory.total_quantity_return : 0;
        this.total_quantity_remove = materialInventory ? +materialInventory.total_quantity_remove : 0;
        this.total_quantity_inventory = materialInventory ? +materialInventory.total_quantity_inventory : 0;
    }

    public mapToList(data: MaterialInventoryResponse[]) {
        let response: MaterialInventoryResponse[] = [];
        data.forEach((e) => {
            response.push(new MaterialInventoryResponse(e));
        });
        return response;
    }
}