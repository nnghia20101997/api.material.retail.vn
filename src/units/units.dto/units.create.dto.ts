import { IsString, Length } from "class-validator";
import { IsNotEmptyString } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class UnitsCreateDTO {

    @IsNotEmptyString()
    name: string;

    @IsString()
    description: string;

}