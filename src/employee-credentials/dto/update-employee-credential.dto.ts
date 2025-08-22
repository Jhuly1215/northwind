// src/employee-credentials/dto/update-employee-credential.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeCredentialDto } from './create-employee-credential.dto';
import { IsOptional, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateEmployeeCredentialDto extends PartialType(CreateEmployeeCredentialDto) {
  // Si solo quieres permitir cambiar password (y NO employeeId), puedes sobreescribir:
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'password debe incluir mayúscula, minúscula y dígito',
  })
  password?: string;
}
