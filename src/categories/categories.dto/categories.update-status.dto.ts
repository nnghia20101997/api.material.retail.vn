import { IsString } from "class-validator";
import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class CategoriesUpdateStatusDTO {

    @IsInt()
    status: number = 0;
}