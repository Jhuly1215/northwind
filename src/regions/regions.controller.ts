// src/regions/regions.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('regions')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('regions')
export class RegionsController {
  constructor(private readonly service: RegionsService) {}

  @ApiOperation({ summary: 'Listar todas las regiones' })
  @ApiResponse({ status: 200, description: 'Lista de regiones.' })
  @Get()
  findAll() { return this.service.findAll(); }

  @ApiOperation({ summary: 'Obtener una región por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la región' })
  @ApiResponse({ status: 200, description: 'Región encontrada.' })
  @ApiResponse({ status: 404, description: 'Región no encontrada.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @ApiOperation({ summary: 'Crear una nueva región' })
  @ApiBody({ type: CreateRegionDto })
  @ApiResponse({ status: 201, description: 'Región creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() dto: CreateRegionDto) { return this.service.create(dto); }

  @ApiOperation({ summary: 'Actualizar una región' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la región' })
  @ApiBody({ type: UpdateRegionDto })
  @ApiResponse({ status: 200, description: 'Región actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Región no encontrada.' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRegionDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar una región' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la región' })
  @ApiResponse({ status: 200, description: 'Región eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Región no encontrada.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
