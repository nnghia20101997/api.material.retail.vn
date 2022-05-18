import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/auth/constants';
import { UnitsController } from './units.controller';
import { Unit } from './units.entity/units.entity';
import { UnitsService } from './units.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unit]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),

  ],

  providers: [UnitsService],
  exports: [UnitsService],
  controllers: [UnitsController],
})
export class UnitsModule { }
