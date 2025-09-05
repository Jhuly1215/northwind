// src/territories/territories.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TerritoriesService } from './territories.service';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('territories')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('territories')
export class TerritoriesController {
  constructor(private readonly service: TerritoriesService) {}

  @ApiOperation({ summary: 'Listar todos los territorios' })
  @ApiResponse({ status: 200, description: 'Lista de territorios.' })
  @Get()
  findAll() { return this.service.findAll(); }

  @ApiOperation({ summary: 'Obtener un territorio por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del territorio' })
  @ApiResponse({ status: 200, description: 'Territorio encontrado.' })
  @ApiResponse({ status: 404, description: 'Territorio no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @ApiOperation({ summary: 'Crear un nuevo territorio' })
  @ApiBody({ type: CreateTerritoryDto })
  @ApiResponse({ status: 201, description: 'Territorio creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() dto: CreateTerritoryDto) { return this.service.create(dto); }

  @ApiOperation({ summary: 'Actualizar un territorio' })
  @ApiParam({ name: 'id', type: String, description: 'ID del territorio' })
  @ApiBody({ type: UpdateTerritoryDto })
  @ApiResponse({ status: 200, description: 'Territorio actualizado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Territorio no encontrado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTerritoryDto) { return this.service.update(id, dto); }

  @ApiOperation({ summary: 'Eliminar un territorio' })
  @ApiParam({ name: 'id', type: String, description: 'ID del territorio' })
  @ApiResponse({ status: 200, description: 'Territorio eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Territorio no encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
