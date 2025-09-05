// src/employee-territories/employee-territories.controller.ts
import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { EmployeeTerritoriesService } from './employee-territories.service';
import { CreateEmployeeTerritoryDto } from './dto/create-employee-territory.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('employee-territories')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('employee-territories')
export class EmployeeTerritoriesController {
  constructor(private readonly service: EmployeeTerritoriesService) {}

  @ApiOperation({ summary: 'Listar todas las asignaciones de empleados a territorios' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones.' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Asignar un territorio a un empleado' })
  @ApiBody({ type: CreateEmployeeTerritoryDto })
  @ApiResponse({ status: 201, description: 'Asignación creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() dto: CreateEmployeeTerritoryDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Eliminar la asignación de un territorio a un empleado' })
  @ApiParam({ name: 'employeeId', type: Number, description: 'ID del empleado' })
  @ApiParam({ name: 'territoryId', type: String, description: 'ID del territorio' })
  @ApiResponse({ status: 200, description: 'Asignación eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada.' })
  @Delete(':employeeId/:territoryId')
  remove(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Param('territoryId') territoryId: string,
  ) {
    return this.service.remove(employeeId, territoryId);
  }
}
