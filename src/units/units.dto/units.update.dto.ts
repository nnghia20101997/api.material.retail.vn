import { IsString } from "class-validator";
import { IsNotEmptyString } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class UnitsUpdateDTO {

    
    @IsNotEmptyString()
    name: string;

    @IsString()
    description: string;

}