import { IsString } from "class-validator";
import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class CategoriesQueryDTO {

    @IsInt()
    status: number = -1;

    @IsString()
    key_search: string = "";
}