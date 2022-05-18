import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class UnitsUpdateStatusDTO {

    @IsInt()
    status: number = 0;

}