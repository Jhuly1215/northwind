import { Injectable } from '@nestjs/common';
import { CreateEmployeeCredentialDto } from './dto/create-employee-credential.dto';
import { UpdateEmployeeCredentialDto } from './dto/update-employee-credential.dto';

@Injectable()
export class EmployeeCredentialsService {
  create(createEmployeeCredentialDto: CreateEmployeeCredentialDto) {
    return 'This action adds a new employeeCredential';
  }

  findAll() {
    return `This action returns all employeeCredentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeCredential`;
  }

  update(id: number, updateEmployeeCredentialDto: UpdateEmployeeCredentialDto) {
    return `This action updates a #${id} employeeCredential`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeCredential`;
  }
}
