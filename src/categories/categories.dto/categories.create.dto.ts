import { IsString } from "class-validator";

export class CategoriesCreateDTO {

    @IsString()
    name: string = "";

    @IsString()
    description: string = "";
}