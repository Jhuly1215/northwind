import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeCredential } from './entities/employee-credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeCredential])],
  exports: [TypeOrmModule],
})
export class EmployeeCredentialsModule {}
