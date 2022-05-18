import {
    createParamDecorator,
    ExecutionContext, HttpException,
    HttpStatus,
    Inject
} from '@nestjs/common';
import {
    isNotEmpty,
    isString,
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';
import { ExceptionResponseDetail } from '../utils.exception.common/utils.exception.common';
import { HandleBase64 } from '../utils.handle-base64.common/utils.handle-base64.common';

export const RequestHeaderVerifyApiKey = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        switch (data) {
            case 'authorization':
                let verifyApiKey: string = HandleBase64.verifyApiKey(request.headers.authorization);
                if (!verifyApiKey) {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.FORBIDDEN,
                            'Vui lòng truyền api_key!',
                        ), HttpStatus.OK);
                } else {
                    return verifyApiKey;
                }
            default:
                throw new HttpException(
                    new ExceptionResponseDetail(HttpStatus.FORBIDDEN), HttpStatus.OK);
        }
    },
);


export const GetUserFromToken = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.user) {
            throw new HttpException(new ExceptionResponseDetail(HttpStatus.UNAUTHORIZED, "Token không hợp lệ!"), HttpStatus.OK);
        }

        return request.user;
    },
);



export function IsNotEmptyString(validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {
        registerDecorator({
            name: 'isNotEmptyString',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any): boolean =>
                    isString(value) && isNotEmpty(value.trim()),
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.BAD_REQUEST,
                            `[${validationArguments.property}] không được để trống `,
                        ), HttpStatus.OK);
                },
            },
        });
    };
}

export function IsNotEmpty(validationOptions?: ValidationOptions) {


    return (object: unknown, propertyName: string) => {
        registerDecorator({
            name: 'isNotEmpty',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {

                validate: (value: any): boolean => typeof value === "string" && value.trim().length > 0,
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.BAD_REQUEST,
                            `[${validationArguments.property}] không được để trống `,
                        ), HttpStatus.OK);
                },
            },

        });
    };
}

export function IsInt(validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {

        registerDecorator({
            name: 'isInt',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any): boolean => !isNaN(value) || !value,
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.BAD_REQUEST,
                            `[${validationArguments.property}] phải là kiêu số nguyên!`,
                        ), HttpStatus.OK);
                },
            },
        });
    };
}

export function Maxlength20(validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {

        registerDecorator({
            name: 'maxLength20',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any): boolean => !(value.length > 20) || !value,
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new HttpException(
                        new ExceptionResponseDetail(
                            HttpStatus.BAD_REQUEST,
                            `[${validationArguments.property}] không được nhập quá 20 ký tự ${propertyName}!`,
                        ), HttpStatus.OK);
                },
            },
        });
    };
}
