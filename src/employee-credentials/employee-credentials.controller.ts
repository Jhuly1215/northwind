import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeCredentialsService } from './employee-credentials.service';
import { CreateEmployeeCredentialDto } from './dto/create-employee-credential.dto';
import { UpdateEmployeeCredentialDto } from './dto/update-employee-credential.dto';

@Controller('employee-credentials')
export class EmployeeCredentialsController {
  constructor(private readonly employeeCredentialsService: EmployeeCredentialsService) {}

  @Post()
  create(@Body() createEmployeeCredentialDto: CreateEmployeeCredentialDto) {
    return this.employeeCredentialsService.create(createEmployeeCredentialDto);
  }

  @Get()
  findAll() {
    return this.employeeCredentialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeCredentialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeCredentialDto: UpdateEmployeeCredentialDto) {
    return this.employeeCredentialsService.update(+id, updateEmployeeCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeCredentialsService.remove(+id);
  }
}
