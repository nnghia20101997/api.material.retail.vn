import { IsString } from "class-validator";

export class CategoriesUpdateDTO {

    @IsString()
    name: string = "";

    @IsString()
    description: string = "";
}