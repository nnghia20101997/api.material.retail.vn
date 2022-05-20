import { IsString } from "class-validator";
import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class MaterialsQueryDTO {
    @IsInt()
    status: number = -1;

    @IsString()
    key_search: string = "";

    @IsInt()
    page: number = 1;

    @IsInt()
    limit: number = 20;
}