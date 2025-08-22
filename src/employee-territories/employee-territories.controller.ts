// src/employee-territories/employee-territories.controller.ts
import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { EmployeeTerritoriesService } from './employee-territories.service';
import { CreateEmployeeTerritoryDto } from './dto/create-employee-territory.dto';

@Controller('employee-territories')
export class EmployeeTerritoriesController {
  constructor(private readonly service: EmployeeTerritoriesService) {}

  @Get() findAll() { return this.service.findAll(); }

  @Post()
  create(@Body() dto: CreateEmployeeTerritoryDto) { return this.service.create(dto); }

  @Delete(':employeeId/:territoryId')
  remove(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Param('territoryId') territoryId: string,
  ) {
    return this.service.remove(employeeId, territoryId);
  }
}
