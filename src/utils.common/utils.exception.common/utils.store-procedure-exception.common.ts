import { HttpException, HttpStatus } from "@nestjs/common";
import { StoreProcedureStatusEnum } from "../utils.store.proceduce-result.common/utils.store.proceduce-status-enum.common";
import { ExceptionResponseDetail } from "./utils.exception.common";

export class ExceptionStoreProcedure {
    data: any;
    constructor(data: any) {
        this.data = data;
    }
    static validate(data: any): boolean {

        if (data.length < 3 && (parseInt(data[1][0].status) === StoreProcedureStatusEnum.ERROR || parseInt(data[0][0].status) === StoreProcedureStatusEnum.FAIL_LOGIC)) {
            throw new HttpException(new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, data[1][0].message), HttpStatus.OK);
        }
        return true;
    }


    static validateEmptyDetail(data: any): boolean {


        if (data.length < 3 && data[1][0].status != StoreProcedureStatusEnum.SUCCESS) {
            let textShow: string = data[1][0].message;

            throw new HttpException(new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, textShow), HttpStatus.OK);
        }
        if (data.length === 3 && data[0].length === 0) {
            throw new HttpException(new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, "Không tồn tại"), HttpStatus.OK);
        }
        return true;
    }
}