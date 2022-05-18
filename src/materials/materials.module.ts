import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/auth/constants';
import { MaterialsController } from './materials.controller';
import { Materials } from './materials.entity/material.entity';
import { MaterialsService } from './materials.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Materials]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [MaterialsService],
    exports: [MaterialsService],
    controllers: [MaterialsController],
})
export class MaterialsModule { }
