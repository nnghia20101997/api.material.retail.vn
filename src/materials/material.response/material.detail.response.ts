import { Materials } from "../materials.entity/material.entity";
import { UtilsDate } from "src/utils.common/utils.format-time.common/utils.format-time.common";

export class MaterialDetailResponse {

    id: number;

    code: string;

    name: string;

    prefix_name: string;

    normaliza_name: string;

    user_id: number;

    avatar: string;

    avatar_thumb: string;

    category_id: number;

    unit_id: number;

    wastage_rate: number;

    out_stock_alert_quantity: number;

    retail_price: number;

    cost_price: number;

    status: number;

    updated_at: string;

    created_at: string;

    constructor(materials?: Materials) {
        this.id = materials ? +materials.id : 0;

        this.code = materials ? materials.code : "";

        this.name = materials ? materials.name : "";

        this.prefix_name = materials ? materials.prefix_name : "";

        this.normaliza_name = materials ? materials.normaliza_name : "";

        this.user_id = materials ? +materials.user_id : 0;

        this.avatar = materials ? materials.avatar : "";

        this.avatar_thumb = materials ? materials.avatar_thumb : "";

        this.category_id = materials ? +materials.category_id : 0;

        this.unit_id = materials ? +materials.unit_id : 0;

        this.wastage_rate = materials ? +materials.wastage_rate : 0;

        this.out_stock_alert_quantity = materials ? +materials.out_stock_alert_quantity : 0;

        this.retail_price = materials ? +materials.retail_price : 0;

        this.cost_price = materials ? +materials.cost_price : 0;

        this.status = materials ? materials.status : 0;

        this.updated_at = materials ? UtilsDate.formatDateTimeVNToString(materials.updated_at) : "";

        this.created_at = materials ? UtilsDate.formatDateTimeVNToString(materials.created_at) : "";


    }

    public mapToList(data: Materials[]) {
        let response: MaterialDetailResponse[] = [];
        data.forEach((e) => {
            response.push(new MaterialDetailResponse(e));
        });
        return response;
    }
}