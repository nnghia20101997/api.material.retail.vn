import { forEach } from "lodash";
import { UtilsDate } from "src/utils.common/utils.format-time.common/utils.format-time.common";
import { Unit } from "../units.entity/units.entity";

export class UnitsDetailResponse {

    id: number;
    name: string;
    user_id: number;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;

    constructor(units?: Unit) {
        this.id = units ? +units.id : 0;
        this.name = units ? units.name : "";
        this.user_id = units ? +units.user_id : 0;
        this.description = units ? units.description : "";
        this.created_at = units ? UtilsDate.formatDateTimeVNToString(units.created_at) : "";
        this.updated_at = units ? UtilsDate.formatDateTimeVNToString(units.updated_at) : "";
    }

    public mapToList(data: Unit[]) {
        let response: UnitsDetailResponse[] = [];
        data.forEach(e => {
            response.push(new UnitsDetailResponse(e));
        })
        return response;
    }
}