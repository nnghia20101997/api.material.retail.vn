import { IsString } from "class-validator";
import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class UnitsQueryDTO {

    @IsInt()
    status: number;

    @IsString()
    key_search: string;

}