import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class UnitsParamsDTO {

    @IsInt()
    id: number = 0;

}