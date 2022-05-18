import { IsString } from "class-validator";

export class UnitsUpdateDTO {

    @IsString()
    name: string;

    @IsString()
    description: string;

}