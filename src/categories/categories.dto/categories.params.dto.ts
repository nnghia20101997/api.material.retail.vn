import { IsString } from "class-validator";
import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class CategoriesParamsDTO {

    @IsInt()
    id: number = 0;
}