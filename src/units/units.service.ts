import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity/users.entity';
import { ExceptionStoreProcedure } from 'src/utils.common/utils.exception.common/utils.store-procedure-exception.common';
import { StoreProcedureResult } from 'src/utils.common/utils.store.proceduce-result.common/utils.store.proceduce-result.common';
import { Repository } from 'typeorm';
import { UnitsCreateDTO } from './units.dto/units.create.dto';
import { UnitsParamsDTO } from './units.dto/units.params.dto';
import { UnitsQueryDTO } from './units.dto/units.query.dto';
import { Units } from './units.entity/units.entity';

@Injectable()
export class UnitsService {
    constructor(
        @InjectRepository(Units)
        private units: Repository<Units>
    ) { }

    async spCreateUnit(
        user: Users,
        unitsCreateDTO: UnitsCreateDTO
    ): Promise<Units> {

        let newUnit: Units = await this.units.query(
            "CALL sp_create_unit(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                user.id,
                unitsCreateDTO.name,
                unitsCreateDTO.description
            ]
        )

        ExceptionStoreProcedure.validateEmptyDetail(newUnit);
        let data: Units = new StoreProcedureResult<Units>().getResultDetail(newUnit);
        return data;
    }

    async spUpdateUnit(
        user: Users,
        unitsParamsDTO: UnitsParamsDTO,
        unitsCreateDTO: UnitsCreateDTO
    ): Promise<Units> {
        let unitUpdated: Units = await this.units.query(
            "CALL sp_update_unit(?,?,?,?, @status, @message); SELECT @status AS status , @message AS message",
            [
                user.id,
                unitsParamsDTO.id,
                unitsCreateDTO.name,
                unitsCreateDTO.description
            ]
        )
        ExceptionStoreProcedure.validateEmptyDetail(unitUpdated);
        let data: Units = new StoreProcedureResult<Units>().getResultDetail(unitUpdated);
        return data;
    }

    async spGetListUnits(
        user: Users,
        unitsQueryDTO: UnitsQueryDTO
    ): Promise<Units[]> {
        let units: Units[] = await this.units.query(
            "CALL sp_get_list_units(?,?,?, @status, @message); SELECT @status AS status , @message AS message",
            [
                user.id,
                unitsQueryDTO.status,
                unitsQueryDTO.key_search
            ]
        )

        ExceptionStoreProcedure.validate(units);
        let data: Units[] = new StoreProcedureResult<Units[]>().getResultDetail(units);
        return data;
    }
}
