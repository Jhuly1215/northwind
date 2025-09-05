import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeCredentialsService } from './employee-credentials.service';
import { CreateEmployeeCredentialDto } from './dto/create-employee-credential.dto';
import { UpdateEmployeeCredentialDto } from './dto/update-employee-credential.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('employee-credentials')
@Controller('employee-credentials')
export class EmployeeCredentialsController {
  constructor(private readonly employeeCredentialsService: EmployeeCredentialsService) {}

  @ApiOperation({ summary: 'Crear credencial de empleado' })
  @ApiBody({ type: CreateEmployeeCredentialDto })
  @ApiResponse({ status: 201, description: 'Credencial creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() createEmployeeCredentialDto: CreateEmployeeCredentialDto) {
    return this.employeeCredentialsService.create(createEmployeeCredentialDto);
  }

  @ApiOperation({ summary: 'Listar todas las credenciales de empleados' })
  @ApiResponse({ status: 200, description: 'Lista de credenciales.' })
  @Get()
  findAll() {
    return this.employeeCredentialsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una credencial de empleado por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la credencial' })
  @ApiResponse({ status: 200, description: 'Credencial encontrada.' })
  @ApiResponse({ status: 404, description: 'Credencial no encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeCredentialsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar una credencial de empleado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la credencial' })
  @ApiBody({ type: UpdateEmployeeCredentialDto })
  @ApiResponse({ status: 200, description: 'Credencial actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Credencial no encontrada.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeCredentialDto: UpdateEmployeeCredentialDto) {
    return this.employeeCredentialsService.update(+id, updateEmployeeCredentialDto);
  }

  @ApiOperation({ summary: 'Eliminar una credencial de empleado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la credencial' })
  @ApiResponse({ status: 200, description: 'Credencial eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Credencial no encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeCredentialsService.remove(+id);
  }
}
