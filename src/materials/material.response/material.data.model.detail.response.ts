import { Material } from "../materials.entity/material.entity";
import { UtilsDate } from "src/utils.common/utils.format-time.common/utils.format-time.common";
import { MaterialDataModel } from "../materials.entity/material.entity.data.model";

export class MaterialDataModelDetailResponse {

    id: number;

    code: string;

    name: string;

    prefix_name: string;

    normalize_name: string;

    user_id: number;

    avatar: string;

    avatar_thumb: string;

    category_id: number;

    category_name: string;

    unit_id: number;

    unit_name: string;

    wastage_rate: number;

    out_stock_alert_quantity: number;

    retail_price: number;

    cost_price: number;

    status: number;

    updated_at: string;

    created_at: string;

    constructor(materials?: MaterialDataModel) {
        this.id = materials ? +materials.id : 0;

        this.code = materials ? materials.code : "";

        this.name = materials ? materials.name : "";

        this.prefix_name = materials ? materials.prefix_name : "";

        this.normalize_name = materials ? materials.normalize_name : "";

        this.user_id = materials ? +materials.user_id : 0;

        this.avatar = materials ? materials.avatar : "";

        this.avatar_thumb = materials ? materials.avatar_thumb : "";

        this.category_id = materials ? +materials.category_id : 0;

        this.category_name = materials ? materials.category_name : '';

        this.unit_id = materials ? +materials.unit_id : 0;

        this.unit_name = materials ? materials.unit_name : '';

        this.wastage_rate = materials ? +materials.wastage_rate : 0;

        this.out_stock_alert_quantity = materials ? +materials.out_stock_alert_quantity : 0;

        this.retail_price = materials ? +materials.retail_price : 0;

        this.cost_price = materials ? +materials.cost_price : 0;

        this.status = materials ? materials.status : 0;

        this.updated_at = materials ? UtilsDate.formatDateTimeVNToString(materials.updated_at) : "";

        this.created_at = materials ? UtilsDate.formatDateTimeVNToString(materials.created_at) : "";


    }

    public mapToList(data: MaterialDataModel[]) {
        let response: MaterialDataModelDetailResponse[] = [];
        data.forEach((e) => {
            response.push(new MaterialDataModelDetailResponse(e));
        });
        return response;
    }
}