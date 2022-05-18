import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/auth/constants';
import { CategoriesController } from './categories.controller';
import { Categories } from './categories.entity/categories.entity';
import { CategoriesService } from './categories.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Categories]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [CategoriesService],
    exports: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule { }
