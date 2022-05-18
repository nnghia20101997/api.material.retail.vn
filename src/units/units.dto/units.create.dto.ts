import { IsString } from "class-validator";

export class UnitsCreateDTO {

    @IsString()
    name: string;

    @IsString()
    description: string;

}