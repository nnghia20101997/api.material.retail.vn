import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class MaterialsParamsDTO {
    @IsInt()
    id: number = 0;
}