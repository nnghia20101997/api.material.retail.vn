import { UtilsDate } from "src/utils.common/utils.format-time.common/utils.format-time.common";
import { Categories } from "../categories.entity/categories.entity";

export class CategoriesDetailResponse {

    id: number;

    user_id: number;

    code: string;

    name: string;

    prefix_name: string;

    normalize_name: string;

    description: string;

    sort: number;

    status: number;

    updated_at: string;

    created_at: string;

    constructor(categories?: Categories) {
        this.id = categories ? +categories.id : 0;
        this.user_id = categories ? +categories.user_id : 0;
        this.code = categories ? categories.code : "";
        this.name = categories ? categories.name : "";
        this.prefix_name = categories ? categories.prefix_name : "";
        this.normalize_name = categories ? categories.normalize_name : "";
        this.description = categories ? categories.description : "";
        this.sort = categories ? +categories.sort : 0;
        this.status = categories ? +categories.status : 0;
        this.created_at = categories ? UtilsDate.formatDateTimeVNToString(categories.created_at) : "";
        this.updated_at = categories ? UtilsDate.formatDateTimeVNToString(categories.updated_at) : "";
    }

    public mapToList(data: Categories[]) {
        let response: CategoriesDetailResponse[] = [];

        data.forEach(e => {
            response.push(new CategoriesDetailResponse(e));
        })

        return response;
    }
}
