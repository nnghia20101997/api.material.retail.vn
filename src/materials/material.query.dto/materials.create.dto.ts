import { IsString } from "class-validator";
import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class MaterialsCreateDTO {

    @IsString()
    name: string = "";

    @IsString()
    avatar: string = "";

    @IsString()
    avatar_thumb: string = "";

    @IsInt()
    category_id: number = 0;

    @IsInt()
    unit_id: number = 0;

    @IsInt()
    wastage_rate: number = 0;

    @IsInt()
    out_stock_alert_quantity: number = 0;

    @IsInt()
    cost_price: number = 0;

    @IsInt()
    retail_price: number = 0;


}