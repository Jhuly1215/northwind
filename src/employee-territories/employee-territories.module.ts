// src/employee-territories/employee-territories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTerritoriesController } from './employee-territories.controller';
import { EmployeeTerritoriesService } from './employee-territories.service';
import { EmployeeTerritory } from './entities/employee-territory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeTerritory])],
  controllers: [EmployeeTerritoriesController],
  providers: [EmployeeTerritoriesService],
})
export class EmployeeTerritoriesModule {}
