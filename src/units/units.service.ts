import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity/users.entity';
import { ExceptionStoreProcedure } from 'src/utils.common/utils.exception.common/utils.store-procedure-exception.common';
import { StoreProcedureResult } from 'src/utils.common/utils.store.proceduce-result.common/utils.store.proceduce-result.common';
import { Repository } from 'typeorm';
import { UnitsCreateDTO } from './units.dto/units.create.dto';
import { UnitsParamsDTO } from './units.dto/units.params.dto';
import { UnitsQueryDTO } from './units.dto/units.query.dto';
import { Unit } from './units.entity/units.entity';

@Injectable()
export class UnitsService {
    constructor(
        @InjectRepository(Unit)
        private unit: Repository<Unit>
    ) { }


    async findOne(
        id: number
    ): Promise<Unit> {
        let unit: Unit = await this.unit.findOne(id);
        return unit;
    }


    async spCreateUnit(
        userId: number,
        unitsCreateDTO: UnitsCreateDTO
    ): Promise<Unit> {

        let newUnit: Unit = await this.unit.query(
            "CALL sp_create_unit(?,?,?, @status, @message); SELECT @status AS status, @message AS  message",
            [
                userId,
                unitsCreateDTO.name,
                unitsCreateDTO.description
            ]
        )

        ExceptionStoreProcedure.validateEmptyDetail(newUnit);
        let data: Unit = new StoreProcedureResult<Unit>().getResultDetail(newUnit);
        return data;
    }

    async spUpdateUnit(
        userId: number,
        unitsParamsDTO: UnitsParamsDTO,
        unitsCreateDTO: UnitsCreateDTO
    ): Promise<Unit> {
        let unitUpdated: Unit = await this.unit.query(
            "CALL sp_update_unit(?,?,?,?, @status, @message); SELECT @status AS status , @message AS message",
            [
                userId,
                unitsParamsDTO.id,
                unitsCreateDTO.name,
                unitsCreateDTO.description
            ]
        )
        ExceptionStoreProcedure.validateEmptyDetail(unitUpdated);
        let data: Unit = new StoreProcedureResult<Unit>().getResultDetail(unitUpdated);
        return data;
    }

    async spGetListUnits(
        userId: number,
        unitsQueryDTO: UnitsQueryDTO
    ): Promise<Unit[]> {
        let units: Unit[] = await this.unit.query(
            "CALL sp_get_list_units(?,?,?, @status, @message); SELECT @status AS status , @message AS message",
            [
                userId,
                unitsQueryDTO.status,
                unitsQueryDTO.key_search
            ]
        )

        ExceptionStoreProcedure.validate(units);
        let data: Unit[] = new StoreProcedureResult<Unit[]>().getResultDetail(units);
        return data;
    }
}
